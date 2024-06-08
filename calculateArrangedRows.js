import {
  assignUnassignedSeats,
  removeOverplacedSeats,
} from "./balanceSeatsArrangement.js";

/**
 * Calculates the total number of seats allocated across the specified number of rows,
 * each with a specified spacing, starting from the inner radius.
 *
 * @param {number} rowsCount - The number of rows to allocate seats to.
 * @param {number} rowSpacing - The spacing between each row.
 * @param {number} innerRadius - The radius of the innermost row.
 * @returns {{totalAllocatedSeats: number, rows: { seats: number, circumference: number }[]}}
 *          An object containing the total number of allocated seats and an array of row objects.
 * @throws {Error} Will throw an error if rowsCount, rowSpacing, or innerRadius are negative.
 */
const calculateSeatingArrangement = (rowsCount, rowSpacing, innerRadius) => {
  if (rowsCount < 0 || rowSpacing < 0 || innerRadius < 0) {
    throw new Error(
      "rowsCount, rowSpacing, and innerRadius must be non-negative."
    );
  }
  if (rowsCount === 0) {
    return { totalAllocatedSeats: 0, rows: [] };
  }

  let totalAllocatedSeats = 0;
  const rows = [];

  for (let i = 0; i < rowsCount; i++) {
    const currentRadius = innerRadius + i * rowSpacing;
    const currentCircumference = Math.PI * currentRadius;

    let seatsInRow;
    if (currentRadius === 0 || currentCircumference === 0) {
      seatsInRow = 1;
    } else {
      seatsInRow = Math.round(currentCircumference / rowSpacing);
    }

    totalAllocatedSeats += seatsInRow;
    rows.push({
      seats: seatsInRow,
      circumference: currentCircumference,
    });
  }

  return {
    totalAllocatedSeats,
    rows,
  };
};

/**
 * Splits the total seats into two rows.
 * The front row gets the floor value of half the total seats.
 * The back row gets the ceiling value of half the total seats.
 *
 * @param {number} totalSeats - The total number of seats to distribute.
 * @returns {number[]} An array with the number of seats in the front and back rows.
 */
export function getSeatsForTwoRows(totalSeats) {
  const seatsInFrontRow = Math.floor(totalSeats / 2);
  const seatsInBackRow = Math.ceil(totalSeats / 2);
  return [seatsInFrontRow, seatsInBackRow];
}

/**
 * Calculates the arrangement of rows to fit
 * the total number of seats between the inner and outer radii.
 * This function iteratively determines the optimal number of rows
 * and adjusts the seat allocation to fit the specified total number of seats.
 *
 * @param {number} radiusDiff - The difference between the outer and inner radii.
 * @param {number} totalSeats - The total number of seats to be allocated.
 * @param {number} innerRadius - The radius of the innermost row.
 * @returns {number[]} An array of rows, its length representing number of rows.
 */
export function calculateArrangedRows(radiusDiff, totalSeats, innerRadius) {
  let rows = [];
  let rowsCount = 1;

  while (true) {
    rows = [];
    const rowSpacing = radiusDiff / rowsCount;
    const { totalAllocatedSeats, rows: currentRows } =
      calculateSeatingArrangement(rowsCount, rowSpacing, innerRadius);

    if (totalAllocatedSeats === totalSeats) {
      rows = currentRows.map((row) => row.seats);
      break;
    } else if (totalAllocatedSeats > totalSeats) {
      const { totalAllocatedSeats: prevTotalAllocatedSeats, rows: prevRows } =
        calculateSeatingArrangement(
          rowsCount - 1,
          radiusDiff / (rowsCount - 1),
          innerRadius
        );

      const prevToTotal = totalSeats - prevTotalAllocatedSeats;
      const currentFromTotal = totalAllocatedSeats - totalSeats;
      const isPrevCloserToTotal = prevToTotal <= currentFromTotal;

      if (isPrevCloserToTotal) {
        const unplacedSeats = totalSeats - prevTotalAllocatedSeats;
        rows = assignUnassignedSeats(prevRows, unplacedSeats);
      } else {
        const overplacedSeats = totalAllocatedSeats - totalSeats;
        rows = removeOverplacedSeats(currentRows, overplacedSeats);
      }
      break;
    } else {
      rowsCount++;
    }
  }

  return rows;
}
