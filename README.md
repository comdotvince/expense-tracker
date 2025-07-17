# Expense Tracker CLI

A simple command-line interface (CLI) tool to track personal expenses, built with Node.js and Commander.js.

This is a submission for the [roadmap.sh backend project](https://roadmap.sh/projects/expense-tracker).

## Features

- ✅ Add new expenses with description and amount
- ✅ List all expenses in a formatted table
- ✅ Delete expenses by ID
- ✅ View expense summaries (total or by month)
- ✅ Data persistence using JSON file storage

## Installation

1. Clone the repository:

```bash
git clone https://github.com/comdotvince/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Make the CLI globally available (optional):

```bash
npm link
```

## Usage

### Adding an Expense

Add a new expense with a description and amount:

```bash
node expense-tracker.js add --description "Lunch at restaurant" --amount 25.50
```

### Listing All Expenses

Display all expenses in a formatted table:

```bash
node expense-tracker.js list
```

Example output:

```
================================================================================
id                   description          amount               date
0                    dinner               50                   7/17/2025
```

### Deleting an Expense

Delete an expense by its ID:

```bash
node expense-tracker.js delete --id 0
```

### Viewing Expense Summary

View total expenses:

```bash
node expense-tracker.js summary
```

View expenses for a specific month (1-12):

```bash
node expense-tracker.js summary --month 7
```

## Commands Reference

| Command   | Description          | Options                                                             |
| --------- | -------------------- | ------------------------------------------------------------------- |
| `add`     | Add a new expense    | `--description <desc>` (required)<br>`--amount <number>` (required) |
| `list`    | List all expenses    | None                                                                |
| `delete`  | Delete an expense    | `--id <number>` (required)                                          |
| `summary` | Show expense summary | `--month <month>` (optional, 1-12)                                  |

## Data Storage

Expenses are stored in [`data.json`](data.json) in the following format:

```json
[
  {
    "id": 0,
    "description": "dinner",
    "amount": 50,
    "date": "7/17/2025"
  }
]
```

## Project Structure

```
expense-tracker/
├── expense-tracker.js # Main CLI application
├── data.json          # JSON file for data persistence
├── package.json       # Project configuration and dependencies
├── README.md          # Project documentation
└── .gitignore         # Git ignore rules
```

## Dependencies

- [commander](https://www.npmjs.com/package/commander) - Command-line interface framework

## Error Handling

The application includes validation for:

- Invalid expense amounts (must be positive numbers)
- Invalid expense IDs (must be valid positive numbers)
- Missing expenses when attempting to delete
- Empty expense lists

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Vince Ermino

## Repository

[GitHub Repository](https://github.com/comdotvince/expense-tracker)
