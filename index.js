#!/usr/bin/env node

import { Command } from "commander";
import { writeFile, readFile } from "fs/promises";

const program = new Command();

const filePath = "data.json";

let expenseId = 0;

// store expenses in memory for simplicity

program
  .name("expense-tracker")
  .description("A CLI tool to track expenses")
  .version("0.0.1");

// for Adding new expense
program
  .command("add")
  .requiredOption("--description <desc>", "Expense description")
  .requiredOption("--amount <number>", "Expense amount", parseFloat)
  .action(async (options) => {
    const expense = {
      id: expenseId++,
      description: options.description,
      amount: options.amount,
      date: new Date().toLocaleDateString(),
    };

    try {
      // Read existing data
      const file = await readFile(filePath, "utf8");
      const json = JSON.parse(file);

      // Modify (e.g. push to an array)
      json.push(expense); // assumes json is an array

      // Write updated data back
      await writeFile(filePath, JSON.stringify(json, null, 2));
    } catch (err) {
      console.error("Error reading or writing file:", err);
    }
  });

program
  .command("list")
  .description("List all expenses")
  .action(async () => {
    console.log("=".repeat(80));
    const data = JSON.parse(await readFile("data.json", "utf8"));
    let printed = false;
    data.forEach((expense) => {
      if (!printed) {
        console.log(
          `${"description".padEnd(20)} ${"amount".padEnd(20)} ${"date".padEnd(
            20
          )}`
        );
      }

      console.log(
        `${expense.description.padEnd(20)} ${expense.amount
          .toString()
          .padEnd(20)} ${expense.date.toString().padEnd(20)}`
      );

      printed = true;
    });
  });

program
  .command("delete")
  .description("Delete an expense")
  .action(async () => {
    const data = JSON.parse(await readFile("data.json", "utf8"));
  });

program
  .command("total")
  .description("Show total expenses")
  .action(() => {
    console.log("Total expenses logic goes here");
  });

// Show help if no command
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse();
