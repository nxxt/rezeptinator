import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@server/user/user.entity';
import { UserRatingEntity } from '@server/user/userRating.entity';
import { RecipesModule } from '@server/recipes/recipes.module';
import { RecipeEntity } from '@server/recipes/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity, UserEntity, UserRatingEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}