import { IOwnAccount, Roles } from '@common/Model/User';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredRoles } from '@server/common/decorators/roles.decorator';
import { User } from '@server/common/decorators/user.decorator';
import { RolesGuard } from '@server/common/guards/roles.guard';
import { AccountDto } from '@server/user/dto/accountDto';
import { CreateUserDto } from '@server/user/dto/createUser.dto';
import { LoginUserDto } from '@server/user/dto/loginUser.dto';
import { UserService } from '@server/user/user.service';

@ApiBearerAuth()
@Controller('user')
@UseGuards(RolesGuard)
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    type: AccountDto,
    description: 'Returns the User Information for the currently logged in user',
  })
  async getOwnAccount(@User('username') username: string): Promise<IOwnAccount> {
    return await this.userService.getAccountTokenByUsername(username);
  }

  @Post()
  @ApiResponse({
    type: AccountDto,
    description: 'Creates a new account with the information submitted by the user',
  })
  async createAccount(@Body() userData: CreateUserDto): Promise<IOwnAccount> {
    return this.userService.createAccount(userData);
  }

  @Delete(':username')
  @RequiredRoles(Roles.Admin)
  @ApiResponse({ description: 'Delete a single account' })
  async deleteAccount(@Param('username') username): Promise<{ success: boolean }> {
    const data = await this.userService.delete(username);
    return { success: true };
  }

  @Delete()
  @ApiResponse({ description: 'Delete your own account' })
  async deleteOwnAccount(@User('username') username: string): Promise<{ success: boolean }> {
    const data = await this.userService.delete(username);
    return { success: true };
  }

  @Post('login')
  @ApiResponse({ description: 'Login to an account using a email and password combination' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<IOwnAccount> {
    return await this.userService.findOne(loginUserDto);
  }
}
