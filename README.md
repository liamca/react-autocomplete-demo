# React AutoComplete Demo for Azure Search

Demo app for autocomplete widget using React and Azure Searc.  Please note this was based on a demo created from this [GitHub repo](https://github.com/rcdexta/react-autocomplete-demo) which was originally written for leveraging Elastic Search.  

### Setup

Clone the repository and install the dependencies

```bash
$ git clone git@github.com:liamca/react-autocomplete-demo.git
$ cd react-autocomplete-demo
$ yarn
```

Start the server by running `yarn start` command

### Customizing the Sample

This sample includes a search query that works with an existing Azure Search index.  It allows you to search for cities stored in the index, so if you type 'sea' it will list "Seattle" and "Seatac".  

To change this to leverage your own Azure Search index, you will need to [create an index](https://docs.microsoft.com/en-us/azure/search/search-create-index-portal) that contains a [suggester](https://docs.microsoft.com/en-us/rest/api/searchservice/suggesters).  In addition, for this sample, you will need to enable [CORS](https://docs.microsoft.com/en-us/rest/api/searchservice/create-index) for your Azure Search index.

Once this is done, you can update index.js to point to your search index.  Specifically, you will:
* Update "azs-playground.search.windows.net" to your search service
* Update "realestate-us-sample" to your index name
* Update the value of the api-key to your Azure Search API Key 
