import { AllergyGroups, IngredientCategories, Vegan } from '@common/Model/Ingredient';
import { IRecipeSummary } from '@common/Model/Recipe/Recipe';
import { ApiProperty } from '@nestjs/swagger';
import { NutrientEntity } from '@server/ingredient/nutrient.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipesummary')
export class RecipeSummaryEntity implements IRecipeSummary {
  @PrimaryGeneratedColumn()
  id: number;

  // If this recipe is vegan / Vegetarian / Neither
  @Column('enum', {
    enum: Vegan,
    default: Vegan.Neither,
  })
  @ApiProperty({ enum: Vegan })
  vegan: Vegan = Vegan.Vegan;

  // All the possible allergies this recipes contains
  @Column('enum', {
    enum: AllergyGroups,
    default: '{' + AllergyGroups.None + '}',
    array: true,
  })
  @ApiProperty({ enum: AllergyGroups, isArray: true })
  allergies: AllergyGroups[] = [];

  @Column('enum', {
    enum: IngredientCategories,
    default: [],
    array: true,
  })
  @ApiProperty({ enum: IngredientCategories, isArray: true })
  // All ingredient categories of this recipe
  categories: IngredientCategories[] = [];

  @OneToOne((type) => NutrientEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  // The total nutrients for the base recipes (for a single serving)
  totalNutritions: NutrientEntity = new NutrientEntity();

  @Column('boolean')
  // If every ingredient also has nutrient Data
  dataForAll = true;

  constructor(data?: IRecipeSummary) {
    if (data != undefined) {
      Object.assign(this, data);
      this.id = undefined;
      this.totalNutritions = new NutrientEntity(data.totalNutritions);
    }
  }
}
