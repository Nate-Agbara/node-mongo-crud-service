const { MongoClient } = require('mongodb')

async function main(){
    const uri = "mongodb+srv://root:root123@cluster0.ymgjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    try{
        await client.connect();
        // await listDatabases(client);

        //we will be doing a CRUD here

        //first, Create
        // await createListing(client, {
        //     name: "my name",
        //     summary: "wo, just work",
        //     bedrooms: 1,
        //     bathrooms: 1
        // })

        //create multiple
        // await createMultipleListings(client, [
        //     {
        //         name: "my name",
        //         summary: "wo, just work",
        //         bedrooms: 1,
        //         bathrooms: 1 
        //     },
        //     {
        //         name: "my other name",
        //         summary: "just work again",
        //         bedrooms: 1,
        //         bathrooms: 1 
        //     },
        
        // ])

        //Next, Read
        await findOneListingByName(client, "my other name")

    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
    
}

main().catch(console.error);

async function createListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .insertOne(newListing);

    console.log(`new listing created with the following id: ${result.insertedId}`);
}

async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .insertMany(newListings);

    console.log(`${result.insertedCount} new listing created with the following id(s):`);
    console.log(result.insertedIds);
}

async function findOneListingByName(client, nameOfListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
    .findOne({name: nameOfListing});

    if(result){
        console.log(`found a listing in the collection with the name ${nameOfListing}`);
        console.log(result);
    }else{
        console.log(`No listing found with the name ${nameOfListing}`);
    }

}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(element => {
        console.log(`- ${element.name}`);
    });
}