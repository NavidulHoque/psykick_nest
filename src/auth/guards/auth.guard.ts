import {
    CanActivate,
    ExecutionContext,
    Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { HandleErrorsService } from 'src/common/handleErrors.service'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'; 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly handleErrorService: HandleErrorsService,
        private readonly prisma: PrismaService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

        if (isPublic) { // bypasses token checks if unauthenticated user is allowed to access
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) this.handleErrorService.throwUnauthorizedError("No token provided, please login")

        const secret = this.config.get('ACCESS_TOKEN_SECRET')

        try {
            const payload = await this.jwtService.verifyAsync(token as string, { secret })

            const user = await this.prisma.user.findUnique({
                where: { id: payload.id }
            })

            if (!user) this.handleErrorService.throwNotFoundError("User not found")

            request['user'] = user;
        }

        catch (error) {

            if (error.name === "TokenExpiredError") {
                this.handleErrorService.throwUnauthorizedError("Token expired, please login again")
            }

            else if (error.name === "JsonWebTokenError") {
                this.handleErrorService.throwUnauthorizedError("Invalid token, please login again");
            }

            else if (error.name === "NotBeforeError") {
                this.handleErrorService.throwUnauthorizedError("Token not active yet, please login again");
            }

            throw error
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}