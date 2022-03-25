# read-action

![Test](https://github.com/papposilene/read-action/workflows/Test/badge.svg?branch=main)

![.github/workflows/read.yml](https://github.com/papposilene/read-action/workflows/.github/workflows/read.yml/badge.svg)

This GitHub action tracks the books that you read by updating a JSON file in your repository. Pair it with
the [iOS Shortcut](shortcut/README.md) to automatically format and open the GitHub issue.

Create a new issue with the book's ISBN in the title. The action will then fetch the book's metadata
using [node-isbn](https://www.npmjs.com/package/node-isbn) and commit the change in your repository, always sorting by
the date you finished the book.

<!-- START GENERATED DOCUMENTATION -->

## Set up the workflow

To use this action, create a new workflow in `.github/workflows` and modify it as needed:

```yml
on:
  issues:
    types:
      - labeled

jobs:
  update_library:
    runs-on: macOS-latest
    name: AddReadBook
    # only continue if issue has "book-read" label
    if: contains( github.event.issue.labels.*.name, 'book-read')
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: AddReadBook
        uses: papposilene/action-read@v1.3.4
      - name: Download the book thumbnail
        run: curl "${{ env.BookThumb }}" -o "data/img/${{ env.BookThumbOutput }}"
        continue-on-error: true
      - name: Commit files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A && git commit -m "Add ${{ env.BookTitle }} to data/read.json."
          git push
      - name: Close issue
        uses: peter-evans/close-issue@v1
        with:
          issue-number: "${{ env.IssueNumber }}"
          comment: "You read ${{ env.BookTitle }} on ${{env.DateRead}}. What will be your next book?"
```

## Action options

- `readFileName`: The file where you want to save your books. Default: `data/read.json`.

- `providers`: Specify the [ISBN providers](https://github.com/palmerabollo/node-isbn#setting-backend-providers) that you want to use, in the order you need them to be invoked. If setting more than one provider, separate each with a comma. Default: `worldcat,openlibrary,google`.

<!-- END GENERATED DOCUMENTATION -->

## Create an issue

The title of your issue must start with the ISBN of the book:

```
1234567890
```

The action will automatically set the date that you finished the book (`dateFinished`) to today. To specify a different
date that you finished the book, add the date after the ISBN in `YYYY-MM-DD` format.

```
1234567890 2020-06-12
```

If you add content to the body of the comment, the action will add it as the value of `notes`.
