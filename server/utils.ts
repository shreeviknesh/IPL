import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

// A helper function to read a csv file
export async function readCsvAsObjectArray(
    filename: string,
    header: string[] = []
) {
    // Read the file and create a buffer from it
    const file = await Deno.open(filename);
    const buffer = new BufReader(file);
    let returnObjectArray: Object[] = [];

    // Wait for the array to be populated before returning it
    await new Promise(async (resolve) => {
        let data;

        // If the headers are mentioned, they're used
        if (header.length == 0) {
            data = await parse(buffer);
        } else {
            data = await parse(buffer, { header: header });
        }

        // Iterating through the parsed buffer and pushing to the object array
        for await (let row of data) {
            returnObjectArray.push(Object(row));
        }

        // Done
        resolve();
    });

    return returnObjectArray;
}
