"use client"
import '@shopify/polaris/build/esm/styles.css';
import {ProductModal} from '../modal/page';
import { useState, useCallback, useEffect } from 'react';
import { Page, Card, } from '@shopify/polaris';
import { IndexFilters, IndexTable, useSetIndexFiltersMode,Button } from '@shopify/polaris';
import { AppProvider } from '@shopify/polaris'
import axios from 'axios';
import Image from 'next/image';

const Table = () => {


    const [itemStrings, setItemStrings] = useState(["All"]);

    const tabs = itemStrings.map((item, index) => ({
        content: item,

    }));

    const { mode, setMode } = useSetIndexFiltersMode();

    const [queryValue, setQueryValue] = useState("");

    //Handling products
    const [products, setProducts] = useState([])

    //taking data's through api call
    const takeProducts = async () => {
       
        const response = await axios.get("https://fakestoreapi.com/products")
        setProducts(response?.data)
    }
    const [searchedProducts, setSearchedProducts] = useState([])

    //invoking data fetching function
    useEffect(() => {

        takeProducts()

    }, [])

    //searching function 
    const handleFiltersQueryChange = useCallback(
        (value) => {

            //updating search query value
            setQueryValue(value);

            // Filtering products based on category or prodcuts title
            const filteredProducts = products.filter((product) =>

                product.title.toLowerCase().includes(value.toLowerCase()) || product.category.toLowerCase().includes(value.toLowerCase())
            );

            setSearchedProducts([...filteredProducts]);
        },
        [products]
    );

    const filters = [];

    // modal showing and hiding handling state
    const [show, setShow] = useState(false)

    //selected product storing state 
    const [data, setData] = useState(null)

    //modal handling
    const handleShow = () => setShow(false)

    //while selecting a product it will be called
    let selectedProduct = (id) => {

        let product = products?.find((val) => val.id === id)
        setData(product ?? [])
        setShow(true)
    }

    //search query is empty will show all products other wise showing filtered products based on search query
    let k = queryValue?.length !== 0 ? searchedProducts : products;
    
    //iterating products
    const rowMarkup = k?.map(({ id, category, title,image, price, rating },index) => (

            <IndexTable.Row
                id={id}
                key={id}
                onClick={e => selectedProduct(id)}
                position={index}
                selectable={false}


            >
                <IndexTable.Cell>
                    <Image
                        src={image}
                        alt={"product thumbnail" + title}
                        width={30}
                        height={30}
                        
                    />
                </IndexTable.Cell>
                <IndexTable.Cell className=' max-w-[30px] overflow-hidden whitespace-nowrap overflow-ellipsis' >{title}</IndexTable.Cell>
                <IndexTable.Cell  >{Math.floor(price)}</IndexTable.Cell>
                <IndexTable.Cell>{category}</IndexTable.Cell>
                <IndexTable.Cell>{rating?.rate}</IndexTable.Cell>


            </IndexTable.Row>
        )
    );


    
    return (
        <AppProvider i18n={{}}>
            {show && <ProductModal data={data} onClose={handleShow} />}
            <Page
               
                title={"Products"}
                primaryAction={{
                    content: "Add product",
                  
                }}
              
                secondaryActions={[
                    { 
                        
                        content: "Export",
                        accessibilityLabel: "Export product list",

                        onAction: () => alert("Export action"),
                    },
                    {
                        content: "Import",
                        accessibilityLabel: "Import product list",
                        onAction: () => alert("Import action"),
                    },
                ]}
            >
                <Card padding="0">
                    <IndexFilters

                        queryValue={queryValue}
                        queryPlaceholder="Searching in all"
                        onQueryChange={handleFiltersQueryChange}
                        onQueryClear={() => setQueryValue('')}
                        tabs={tabs}
                        filters={filters}
                        mode={mode}
                        setMode={setMode}
                    />
                    <IndexTable

                        itemCount={products?.length}
                        headings={[
                            { title: "Image" },
                            { title: "Product" },
                            { title: "Price" },
                            { title: "category" },
                            { title: "Rating" },

                        ]}
                    >
                        {rowMarkup}

                    </IndexTable>
                </Card>

            </Page>
        </AppProvider>

    )

}

export default Table