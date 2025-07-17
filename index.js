#!/usr/bin/env node

import { Command } from "commander";
import { writeFile, readFile } from "fs/promises";
import { type } from "os";

const program = new Command();

const filePath = "data.json";

program
  .name("expense-tracker")
  .description("A CLI tool to track expenses")
  .version("0.0.1");

// for Adding new expense
program
  .command("add")
  .description("Add a new expense")
  .requiredOption("--description <desc>", "Expense description")
  .requiredOption("--amount <number>", "Expense amount", parseFloat)
  .action(async (options) => {
    if (isNaN(options.amount) || options.amount <= 0) {
      console.error("Invalid amount. Please provide a positive number.");
      return;
    }
    // Read existing data
    const file = await readFile(filePath, "utf8");
    const json = JSON.parse(file);
    const expenseId = json.length;
    const expense = {
      id: expenseId,
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
      console.log(`Expense added successfully (ID: ${expenseId})`);
    } catch (err) {
      console.error("Error reading or writing file:", err);
    }
  });

// for Listing all expenses
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
          `${"id".padEnd(20)} ${"description".padEnd(20)} ${"amount".padEnd(
            20
          )} ${"date".padEnd(20)}`
        );
      }

      console.log(
        `${expense.id.toString().padEnd(20)} ${expense.description.padEnd(
          20
        )} ${expense.amount.toString().padEnd(20)} ${expense.date
          .toString()
          .padEnd(20)}`
      );

      printed = true;
    });
  });

// for Deleting an expense
program
  .command("delete")
  .requiredOption("--id <number>", "Expense ID to delete", parseInt)
  .description("Delete an expense")
  .action(async (idNumber) => {
    const id = idNumber.id;

    if (isNaN(id) || id < 0) {
      console.error("Invalid ID. Please provide a valid positive number.");
      return;
    }

    console.log(`Deleting expense with ID: ${id}`);
    const data = JSON.parse(await readFile("data.json", "utf8"));

    const deletedExpense = data.find((expense) => expense.id === id);
    if (!deletedExpense) {
      console.error(`Expense with ID ${id} not found.`);
      return;
    }
    const updatedData = data.filter((expense) => expense.id !== id);
    await writeFile("data.json", JSON.stringify(updatedData, null, 2));
    console.log(`Expense with ID ${id} deleted successfully.`);
  });

// for Showing a summary of expenses
program
  .command("summary")
  .description("Show a summary of expenses")
  .option("--month <month>", "Filter by month (1-12)")
  .action(async (cmd) => {
    const data = JSON.parse(await readFile("data.json", "utf8"));

    let month = cmd.month;

    if (data.length === 0) {
      console.log("No expenses found.");
      return;
    }
    if (month) {
      month = parseInt(month, 10);
      const filteredData = data.filter((expense) => {
        const expenseMonth = new Date(expense.date).getMonth() + 1; // getMonth() is zero-based
        return expenseMonth === month;
      });

      if (filteredData.length === 0) {
        console.log(`No expenses found for month ${month}.`);
        return;
      } else {
        const total = filteredData.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        console.log(`Total expenses for month ${month}: $${total}`);
      }
    } else {
      const total = data.reduce((sum, expense) => sum + expense.amount, 0);
      console.log(`Total expenses: $${total}`);
    }
  });

program.parse();
