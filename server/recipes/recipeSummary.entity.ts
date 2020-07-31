import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AllergyGroups, IngredientCategories, Vegan } from '@common/Model/Ingredient';
import { NutrientEntity } from '@server/ingredient/nutrient.entity';

@Entity('recipesummary')
export class RecipeSummaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // If this recipe is vegan / Vegetarian / Neither
  @Column('enum', {
    enum: Vegan,
    default: Vegan.Neither,
  })
  vegan: Vegan;

  // All the possible allergies this recipes contains
  @Column('enum', {
    enum: AllergyGroups,
    default: '{' + AllergyGroups.None + '}',
    array: true,
  })
  allergies: AllergyGroups[];

  @Column('enum', {
    enum: IngredientCategories,
    default: [],
    array: true,
  })
  // All ingredient categories of this recipe
  categories: IngredientCategories[];

  @OneToOne((type) => NutrientEntity, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  // The total nutrients for the base recipes (the servings the recipe has)
  totalNutritions?: NutrientEntity;
}