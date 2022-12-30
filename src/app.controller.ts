import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";

import { AppService } from "./app.service";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private readonly appService: AppService,
    // eslint-disable-next-line no-unused-vars
    private authService: AuthService
  ) {}

  @Get()
  healthCheckPath(): string {
    return this.appService.getHealth();
  }
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("user/profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
