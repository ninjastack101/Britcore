# Britecore Test Task
This project is a solution to Britecore's Frontend hiring test.

### Setup
- To start the project in development mode:
```bash
npm start
```
- To build the project:
```bash
npm run build
```

### Problem Statement
- Create your own datatable component.
- Solution must use Vue.js.
- Solution must use Vuex.
- Vuex should save data to backend persistent store like Firebase or DynamoDB.
- Demonstrate a level of visual polish and UX skill.

### Approach
In terms of development, datatable component consists of two main/parent components.
- TableComponent
- TableColumn

*TableRow*, *TableColumnHeader* and *TableCell* components are children of main TableComponent.

### Props

You can pass these props to `table-component`:

- `data`: (required) the data the component will operate on. This can either be an array or function which returns data.
- `show-filter`: set this to `false` to not display the `filter` field.
- `sort-by`: the property in data on which to initially sort.
- `sort-order`: the initial sort order.
- `table-class`: the passed value will be added to the `class` attribute of the rendered table
- `thead-class`: the passed value will be added to the `class` attribute of the rendered table head.
- `tbody-class`: the passed value will be added to the `class` attribute of the rendered table body.
- `filter-placeholder`: the text used as a placeholder in the filter field
- `filter-no-results`: the text displayed when the filtering returns no results

For each `table-column` a column will be rendered. It can have these props:

- `show`: (required) the property name in the data that needs to be shown in this column.
- `label`: the label that will be shown on top of the column. Set this to an empty string to display nothing. If this property is not present, the string passed to `show` will be used.
- `data-type`: if your column should be sorted numerically set this to `numeric`. If your column contains dates set it to `date:` followed by the format of your date
- `sortable`: if you set this to `false` then the column won't be sorted when clicking the column header
- `sort-by`: you can set this to any property present in `data`. When sorting the column that property will be used to sort on instead of the property in `show`.
- `filterable`: if this is set to `false` than this column won't be used when filtering
- `filter-on`: you can set this to any property present in `data`. When filtering the column that property will be used to filter on instead of the property in `show`.
- `hidden`: if you set this to `true` then the column will be hidden. This is useful when you want to sort by a field but don't want it to be visible.
- `header-class`: the passed value will be added to the `class` attribute of the columns `th` element.
- `cell-class`: the passed value will be added to the `class` attribute of the columns `td` element.


##### Backend persistent store

For this purpose, Firebase/Firestore has been used. Firebase enables us to create a database which stores JSON formatted objects (*Documents*) in *Collections*.

This data-table component has been designed to work with such Firebase database. Seamless integration with firebase results in very quick and real time updations in our remote firebase database.

##### Vuex

Data fetched from firebase database is stored in Vuex local store. This keeps our data separated from application-wide atomic data such as sortBy filters, sorting order.

Any updation to data in table, updates data in Vuex local store and then corresponding update is made in remote firebase database.

##### Reusability
In order to make data-table truly generic and reusable, component has been designed to work independent of the data that needs to be displayed in table.

*TableComponent* and *TableColumn* are logically separated. This makes it possible to pass custom data to *TableComponent* and corresponding column headings to *TableColumn* along with column metadata to enable or disable sorting/filtering as per requirements.

As there is no tight coupling between *TableComponent* and *TableColumn*, let it be any dataset, this data-table can be used to display data in tables.

##### Responsive Design

Data-table component's design is fully responsive, making it work seamlessly in range of screen sizes and devices.


##### Deployment

This project has been deployed on Heroku. Here is the link for the deployed version:

## Questionnaire

#### How long did you spend on the test?
3 working  days - 25 hours

#### Would you do anything differently if you had more time?
According to me, Data-table component is and should be functionally very rich. This component still has a lot of scope in terms of functionality enhancements. To be specific, **Pagination** and **Enhanced Filters** would be my priorities if I had more time.

#### In what ways, would you adapt your component so that it could be used in many different scenarios?
This data-table component has been designed to make it as generic and reusable as possible. Still, few things such as Vuex store, Firebase integration are the areas where we can make it more generic.

#### What is your favorite CSS property? Why?
CSS Gradient properties. Dynamically rendering gradients of different colors makes this property very useful. Especially, when we are dealing with features that require white-labelled approaches, using images for background and other things makes it very hard to customize feature on the fly.

#### What is your favorite modern Javascript feature? Why?
For me, it has to be **Async-Await**. Lines of code this feature saves and extent to which code readability is improved, is just crazy. This feature makes asynchronous javascript very intuitive to handle.

#### What is your favorite third party Vue.js library? Why?
**Quasar-Framework**. Out of the box UI components, responsive designs, support for hybrid mobile apps and eletron apps. Just wow!

