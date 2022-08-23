# Wikipedia-Timeline-API

An API for extracting dates from Wikipedia articles.

Consumes services from:
- [Wikipedia](https://en.wikipedia.org/)
- [WTF Wikipedia](https://www.npmjs.com/package/wtf_wikipedia)

# Examples

* Fetch timeline data for multiple article titles : `POST /api/w/`

    example payload:
    ```javascript
      [
        {articleTitle: "Pangaea"}, 
        {articleTitle: "Human"}, 
        {articleTitle: "Agriculture"},
        {articleTitle: "Pangaea"}
        {articleTitle: "Human"}
        {articleTitle: "Agriculture"}
        {articleTitle: "Horseshoe crab"}
        {articleTitle: "Rodinia"}
        {articleTitle: "Columbia (supercontinent)"}
        {articleTitle: "Tool"}
      ]
    ```

    ## Success Response

    **Code** : `200 OK`

    **Content example**

    ```json
      {
        "sorted":
          [
            {
              "articleTitle":"2022",
              "pageId":52412,
              "stringDate":"in 2020",
              "context":"The global rollout of COVID-19 vaccines which began in 2020...",
              "sentence":"The global rollout of COVID-19 vaccines which began in 2020...",
              "dateSortMs":1577836800000,
              "meta":
                {
                  "sectionTitle":""
                }
            }
          ],
        "headers":
          [
            {
              "header":
                {
                  "searchedValue":"2022",
                  "foundArticleTitle":"2022",
                  "countRecords":1
                }
            }
          ]
      }
    ```

<!-- ## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "non_field_errors": [
        "Unable to login with provided credentials."
    ]
}
``` -->
