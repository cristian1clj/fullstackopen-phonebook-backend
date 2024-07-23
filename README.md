# ☎️ Phonebook API

The Phonebook API allows you to manage person information (name and number) in a basic way.
This proyect is the solution to the *phonebook backend* task from the ***Full Stack Open*** course.

> 🔩 Developed with **JavaScript** | **nodeJS**.

## 🧪 Demo

https://fullstackopen-phonebook-backend-2uz4.onrender.com/

> More about proyect endpoints in ***Documentation(endpoints)*** section.

## ▶️ How to Run

To run the project, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/cristian1clj/fullstackopen-phonebook-backend.git
```

2. Navigate to the project directory.

```bash
cd fullstackopen-phonebook-backend
```

3. Install the required dependencies using npm.

```bash
npm install
```

4. Run with the following command.

```bash
npm start
```

## 📃 Documentation(endpoints)

<table>
  <tr>
    <th>TAGS</th>
    <th>METHODS</th>
    <th>ENDPOINTS</th>
    <th>DESCRIPTION</th>
    <th>REQUEST BODY</th>
    <th>RESPONSE</th>
  </tr>
  <tr>
    <td rowspan="5">Persons</td>
    <td style="background-color: #61affe; color: white">GET</td>
    <td>/api/persons</td>
    <td>Get all people info</td>
    <td>
      ----
    </td>
    <td>
    [<br>
    -- {<br>
    ---- "id": int,<br>
    ---- "name": string,<br>
    ---- "number": string<br>
    -- },<br>
    -- { ... }<br>
    ]
    </td>
  </tr>
  <tr>
    <td style="background-color: #61affe; color: white">GET</td>
    <td>/api/persons/:id</td>
    <td>Get person info by id</td>
    <td>
      ----
    </td>
    <td>
    {<br>
    -- "id": int,<br>
    -- "name": string,<br>
    -- "number": string<br>
    }<br>
    +++++ or +++++<br>
    Status 404
    </td>
  </tr>
  <tr>
    <td style="background-color: #49cc90; color: white">POST</td>
    <td>/api/persons</td>
    <td>Create new person</td>
    <td>
    {<br>
    -- "name": string,<br>
    -- "number": string<br>
    }
    </td>
    <td>
    {<br>
    -- "id": int,<br>
    -- "name": string,<br>
    -- "number": string<br>
    }<br>
    +++++ or +++++<br>
    Status 400<br>
    { error: "content missing" }<br>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f93e3e; color: white">UPDATE</td>
    <td>/api/persons/:id</td>
    <td>Update person by id</td>
    <td>
    {<br>
    -- "id": int,<br>
    -- "name": string,<br>
    -- "number": string<br>
    }<br>
    </td>
    <td>
    {<br>
    -- "id": int,<br>
    -- "name": string,<br>
    -- "number": string<br>
    }<br>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f93e3e; color: white">DELETE</td>
    <td>/api/persons/:id</td>
    <td>Delete person by id</td>
    <td>
      ----
    </td>
    <td>
      Status 204
    </td>
  </tr>
  <tr>
    <td rowspan="1">Info</td>
    <td style="background-color: #61affe; color: white">GET</td>
    <td>/api/info</td>
    <td>Get registers amount and UTC</td>
    <td>
      ----
    </td>
    <td>
    HTML content
    </td>
  </tr>
</table>