
import path from "path";
import fs from 'fs';
import { NextResponse } from "next/server";

function getProductsFilePath(){
    return path.join(process.cwd(), 'data', 'products.json');
}

function getProducts(){
    const filePath = getProductsFilePath();
    try{
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch(err){
        return [];
    }
}

function saveProducts(products){
    const filePath = getProductsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
}

export async function POST(request) {
    const newProduct = await request.json();

    if(!newProduct.title || !newProduct.price){
        return NextResponse.json(
            {message: "Title and price are required"},
            {status: 400} // bad request
        );
    }
    const products = getProducts();
    
    products.push(newProduct);

    saveProducts(products);

    return NextResponse.json(
        { 
            message: "Product added successfully",
            product: newProduct
        },
        {status: 201} // 201 created
    );
}

export async function GET() {   // client component can't interact with server directly so we make a new endpoint
    const products = getProducts();
    return NextResponse.json(products);
}