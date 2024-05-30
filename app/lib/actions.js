"use server"

// users
import { revalidatePath } from "next/cache"
import { User } from "./models"
import { Product } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt  from "bcryptjs"
import { signIn } from "../auth"
import { useRouter } from "next/navigation"


// export const addUser = async (formData) => {
// const {username, email, password, phone, isAdmin, isActive, address} = Object.fromEntries(formData)


// try{
//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(password, salt)

//   const res = await fetch("http://localhost:3000/api/users", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       username,
//       email,
//       password: hashedPassword,
//       phone,
//       isAdmin,
//       isActive,
//       address,
//     })
//   });


//   if(res.ok){
//     revalidatePath("/dashboard/users")
//     return redirect("/login")
//   }else {
//     throw new Error ("Failed to Create Topic")
//   }
// } catch (error) {
//   console.log(error )
// }
// }

// update users

// export const updateUser = async (e) => {
//   const {id, username, email, password, phone, isAdmin, isActive, address} = Object.fromEntries(formData)

//   try{
//     connectToDB();

//     const updateFields = {
//       username, email, password, phone, isAdmin, isActive, address
//     }

//     Object.keys(updateFields).forEach(
//       (key) =>
//         (updateFields[key] === "" || undefined)
//             && delete updateFields[key]
//     );
//     await User.findByIdAndUpdate(id, updateFields)

//   }catch(err){
//     console.log(err)
//     throw new Error("Can Not Update User!")
//   }

//   revalidatePath("/dashboard/users")
//   return redirect("/dashboard/users")
//   }


// delete users
export const deleteUser = async (formData) => {

  const {id} = Object.fromEntries(formData)

  try{
    connectToDB();

    await User.findByIdAndDelete(id)
  }catch(err){
    console.log(err)
    throw new Error("Can Not Delete User!")
  }

  revalidatePath("/dashboard/users")
  }

// products
// add product
export const addProduct = async (formData) => {

const {title, desc, price, stock, color, size} = Object.fromEntries(formData)

try{
  connectToDB();

  const newProduct = new Product({
    title,
    desc,
    price,
    stock,
    color,
    size,
  })

  await newProduct.save();
}catch(err){
  console.log(err)
  throw new Error("Can Not Create Product!")
}

revalidatePath("/dashboard/products")
redirect("/dashboard/products")
}

// Update Product

export const updateProduct = async (formData) => {
  const {id, title, desc, price, stock, color, size} = Object.fromEntries(formData)

  try{
    connectToDB();

    const updateFields = {
      title, desc, price, stock, color, size
    }

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined)
            && delete updateFields[key]
    );
    await Product.findByIdAndUpdate(id, updateFields)

  }catch(err){
    console.log(err)
    throw new Error("Can Not Update User!")
  }

  revalidatePath("/dashboard/products")
  redirect("/dashboard/products")
  }

// delete product
export const deleteProduct = async (formData) => {

const {id} = Object.fromEntries(formData)

try{
  connectToDB();

  await Product.findByIdAndDelete(id)

}catch(err){
  console.log(err)
  throw new Error("Can Not Delete Product!")
}

revalidatePath("/dashboard/products")
}

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
