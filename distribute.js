import {
  calculateArrangedRows,
  getSeatsForTwoRows,
} from "./calculateArrangedRows.js";

/**
 * Distributes the total number of seats between the inner and outer radii.
 * Function calculates the arrangement of seats across rows, ensuring
 * they fit within the specified inner and outer radii
 * with spacing between rows and seats as even as possible.
 * If the inner radius is greater than the outer radius, the radii are swapped.
 *
 * @param {number} innerRadius - The radius of the innermost row.
 * @param {number} outerRadius - The radius of the outermost row.
 * @param {number} totalSeats - The total number of seats to be allocated.
 * @returns {number[]}
 *          An array of rows, its length representing number of rows.
 *          If there no seats to place returns empty array.
 * @throws {Error} Throws an error if either the inner or outer radius is negative.
 */
function distribute(innerRadius, outerRadius, totalSeats) {
  if (totalSeats === 0) {
    return [];
  }
  if (innerRadius < 0 || outerRadius < 0) {
    throw new Error("Inner and outer radius cannot be negative.");
  }
  if (innerRadius === outerRadius) {
    /**
     * Even radii are processed as if only
     * possible number of rows is two - making it a rectangle
     */
    return getSeatsForTwoRows(totalSeats);
  }

  let swapRadii = false;
  if (innerRadius > outerRadius) {
    /**
     * Scenario of larger innerRadius than outerRadius
     * is processed as if graph was reversed, swapping values
     * and making innerRadius always the smaller one in calculations.
     */
    [innerRadius, outerRadius] = [outerRadius, innerRadius];
    swapRadii = true;
  }

  const radiusDiff = outerRadius - innerRadius;
  const rows = calculateArrangedRows(radiusDiff, totalSeats, innerRadius);

  return swapRadii ? rows.reverse() : rows;
}

console.log(distribute(1, 50, 0), "no seats to assign");
console.log(distribute(0, 3, 50), "inner as zero");
console.log(distribute(3, 1, 50), "inner is larger than outer");
console.log(distribute(3, 3, 50), "radii are equal, seats even");
console.log(distribute(3, 3, 21), "radii are equal, seats odd");

console.log(distribute(1, 3, 50));
console.log(distribute(1, 3, 100));
console.log(distribute(1, 3, 500));
console.log(distribute(3, 8, 500));
console.log(distribute(2, 10, 300));
console.log(distribute(1, 50, 5000));

console.log(distribute(-1, 3, 50), "inner lower than zero");
