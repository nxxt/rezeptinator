import { IIngredient } from '@common/Model/Ingredient';
import { LocalisationInformation } from '@common/Model/Localisation';
import { IPortion, PortionFunctions, PortionTypes, Unit, Units } from '@common/Model/Portion';

/**
 * A UnitPortion is used to represent an ingredient measured in a specific unit (like 500g apple)
 *
 * @export
 * @class UnitPortion
 * @implements {IPortion}
 * @extends {PortionFunctions}
 */
export class UnitPortion extends PortionFunctions implements IPortion {
  static readonly Units = Unit;
  type: Unit;
  readonly instanceType = PortionTypes.Unit;

  /**
   * Creates an instance of UnitPortion.
   * @param {IPortion} { amount, type, ingredient, modifier }
   * @memberof UnitPortion
   */
  constructor({ amount, type, ingredient }: IPortion) {
    super();
    this.amount = amount;
    this.type = type as Unit;
    this.ingredient = ingredient;
  }

  /**
   * Returns if this specific instance can be used to calculate nutritions
   *
   * @returns {boolean}
   * @memberof UnitPortion
   */
  canBeApplied(): boolean {
    return this.ingredient.hasOwnProperty('nutritions');
  }

  /**
   * Get the displayed string in the Recipe List
   *
   * @returns {LocalisationInformation}
   * @memberof UnitPortion
   */
  getPrefix(): LocalisationInformation {
    return {
      key: 'UnitPortionPrefix',
      options: {
        amount: this._cachedAmount,
        fraction: this._cachedFraction,
        unit: '$t(' + Unit[this.type] + 'UnitShort)',
      },
    };
  }

  /**
   * Get the Weight of this portion in g
   *
   * @returns {number}
   * @memberof UnitPortion
   */
  getWeight(): number {
    return this.amount * Units[this.type];
  }

  /**
   * Returns all Possible types for this Portion (For example g, mg, pinch)
   *
   * @static
   * @returns {LocalisationInformation[]}
   * @memberof UnitPortion
   */
  static getCandidates(): LocalisationInformation[] {
    return Object.keys(Unit).map(
      (entry): LocalisationInformation => {
        return {
          key: entry + 'Unit',
        };
      },
    );
  }
}