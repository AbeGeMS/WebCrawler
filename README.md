# Overview 
This is a book website. It can fetch books table of contents and render content.
# Provisioning
* Install [Nodejs](https://nodejs.org/en/)
* Install [yarn](https://yarnpkg.com/en/)
# Initial Project
* Develop environment: 
    > \> yarn install
* Production enviroment:
    > \> yarn install --prod
# Command
* Build 
    > \> npm run build
* Launch website
    > \> npm run nodemon
* Run Unit Test
    > \> npm run test
* Launch in Production
    > \> npm run forever
# Other
* Add dev dependency
    > \> yarn add xxxx -D
* Remove dependency
    > \> yarn remove xxxx

# Dev Design
## API
- **GET** ~/books?id=bookStore
    > **return**
    ```json
    {
        id:"74_3482",
        name:"xxxxxx",
    }
    ```
- **POST** ~/book
    > body
    ```json
    {
        url:"www.xxx.com/xxxx",
        bookId: "74_83245",
        chapterId: "4857",
    }
    ```
    > **return**
    ```json
    {
        content: "xxxxxx"
    }
    ```
- **POST** ~/tableOfContent
    > body
    ```json
    {
        url:"www.xxx.com/xxxx",
    }
    ```
    > **return**
    ```json
    {
        list:["xxxx","xxxxx"],
    }
    ```
- **GET** ~/latestChapter?id=bookId
    > **return** charpter number
    > **type** number
- **GET** ~/putChapter?id=bookId&chapter=number
    > **return** 
    > **type**
- **GET** ~/delCache?id=bookId
    > **return** 
    > **type**

## DataFlow
* Main flow

    ```sequence
    client ->> server:index.html
    client ->> client: check cookie BaseDomain
    client --> client: render input bookDomain
    client ->> server: getBooks
    server ->> client: BookMarkData[]
    client --> client: render book list
    client ->> server: get book table
    server ->> client: TitleData[]
    client ->> server: get latest charpter(bookId)
    server ->> client: xyz
    ```
* Add book
    ```sequence
    client -->> client: Render add book
    client ->> server: search book
    server ->> client: TitleData[]
    ```
* Get book conent
    ```sequence
    client ->> server: getContent(bookId)
    server ->> client: ContentData[]
    ```