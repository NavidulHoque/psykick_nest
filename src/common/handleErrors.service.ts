import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class HandleErrorsService {

    handleError(error: any) {
        if (error instanceof BadRequestException ||
            error instanceof NotFoundException ||
            error instanceof UnauthorizedException ||
            error instanceof ForbiddenException) {

            throw error; // nest js will throw the correct error
        }

        if (error.name === "ValidationError") {

            const message: string[] = [];

            Object.keys(error.errors).forEach((field) => {
                message.push(error.errors[field].message);
            });

            this.throwBadRequestError(message)
        }

        throw new InternalServerErrorException(error.message);
    }

    throwNotFoundError(message: string) {
        throw new NotFoundException(message, {
            cause: new Error(),
            description: 'Resources not found',
        })
    }

    throwBadRequestError(message: string | string[]) {
        throw new BadRequestException(message, {
            cause: new Error(),
            description: 'Your requested data is not valid',
        });
    }

    throwUnauthorizedError(message: string) {
        throw new UnauthorizedException(message, {
            cause: new Error(),
            description: 'Your certain action is unauthorized',
        });
    }

    throwForbiddenError(message: string) {
        throw new ForbiddenException(message, {
            cause: new Error(),
            description: 'Your certain action is forbidden',
        });
    }
}