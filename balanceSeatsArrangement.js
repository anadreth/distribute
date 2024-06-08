/**
 * Calculates the space per seat in a given row.
 * This function returns the space each seat occupies
 * through dividing the current circumference of the row
 * by the number of seats in the row.
 * @param {{ seats: number, circumference: number }} row
 *        The row object containing seats and circumference information.
 * @returns {number} The space per seat in the row.
 * @throws {Error} Will throw an error if seatsInRow is zero to avoid division by zero.
 */
function calculateSpace(row) {
  if (row.seats === 0) {
    throw new Error("Number of seats in row cannot be zero.");
  }
  return row.circumference / row.seats;
}

/**
 * Assigns the specified number of unassigned seats to the rows.
 * This function adds seats to the row with the current maximum space
 * until all unassigned seats are placed.
 *
 * @param {{ seats: number, circumference: number }[]} rows
 *        An array of row objects, each containing seats and circumference information.
 * @param {number} unassignedSeats - The number of seats to be assigned.
 * @returns {number[]} An array with the updated number of seats in each row.
 */
export function assignUnassignedSeats(rows, unassignedSeats) {
  for (let i = 0; i < unassignedSeats; i++) {
    let maxSpaceRowIndex = -1;
    let maxSpace = -Infinity;

    rows.forEach((row, index) => {
      const space = calculateSpace(row);
      if (space > maxSpace) {
        maxSpace = space;
        maxSpaceRowIndex = index;
      }
    });

    rows[maxSpaceRowIndex].seats += 1;
    rows[maxSpaceRowIndex].circumference =
      rows[maxSpaceRowIndex].seats * calculateSpace(rows[maxSpaceRowIndex]);
  }
  return rows.map((row) => row.seats);
}

/**
 * Removes the specified number of overplaced seats from the rows.
 * This function reduces the number of seats in the row
 * with the current minimum space until the specified number
 * of overplaced seats is removed.
 *
 * @param {{ seats: number, circumference: number }[]} rows
 *        An array of row objects, each containing seats and circumference information.
 * @param {number} overplacedSeats - The number of seats to be removed.
 * @returns {number[]} An array with the updated number of seats in each row.
 */
export function removeOverplacedSeats(rows, overplacedSeats) {
  for (let i = 0; i < overplacedSeats; i++) {
    let minSpaceRowIndex = -1;
    let minSpace = Infinity;

    rows.forEach((row, index) => {
      const space = calculateSpace(row);
      if (space < minSpace && row.seats > 1) {
        minSpace = space;
        minSpaceRowIndex = index;
      }
    });

    if (minSpaceRowIndex !== -1) {
      rows[minSpaceRowIndex].seats -= 1;
      rows[minSpaceRowIndex].circumference =
        rows[minSpaceRowIndex].seats * calculateSpace(rows[minSpaceRowIndex]);
    }
  }
  return rows.map((row) => row.seats);
}
