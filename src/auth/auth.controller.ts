import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';
import { AuthGuard } from './guards'; 
import { OtherAuthDto } from './dto'; 
import { RolesGuard } from './guards';
import { User } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("/register")
    register(@Body() dto: RegistrationDto) {
        return this.authService.register(dto)
    }

    @Post("/patientLogin")
    patientLogin(@Body() dto: LoginDto) {
        return this.authService.patientLogin(dto)
    }

    @Post("/doctorLogin")
    doctorLogin(@Body() dto: LoginDto) {
        return this.authService.doctorLogin(dto)
    }

    @Post("/adminLogin")
    adminLogin(@Body() dto: LoginDto) {
        return this.authService.adminLogin(dto)
    }

    @Post("/forgetPassword")
    forgetPassword(@Body() dto: OtherAuthDto) {
        return this.authService.forgetPassword(dto.email!)
    }

    @Post("/verifyOtp")
    verifyOtp(@Body() dto: OtherAuthDto) {
        return this.authService.verifyOtp(dto.email!, dto.otp!)
    }

    @Post("/resetPassword")
    resetPassword(@Body() dto: OtherAuthDto) {
        return this.authService.resetPassword(dto.email!, dto.newPassword!)
    }

    @Post("/refreshAccessToken")
    refreshAccessToken(
        @Body() dto: OtherAuthDto
    ){
        return this.authService.refreshAccessToken(dto.refreshToken!)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Post("/logout")
    async logout(
        @User("id") id: string
    ){
        return this.authService.logout(id)
    }
}