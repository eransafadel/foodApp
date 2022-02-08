import { useContext } from 'react';
import classes from  './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
const MealItem = (props) => {
    
    const cartCtx= useContext(CartContext);
    console.log(props.meal.price);
    const price =`$${props.meal.price.toFixed(2)}`; 

    const addToCartHandler =(amount)=>
    {

        cartCtx.addItem({
            id: props.meal.id,
            name:props.meal.name,
            amount:amount,
            price:props.meal.price
        });
    
    };
    return <li className={classes.meal}>
        <div>
            <h3>{props.meal.name}</h3>
            <div className={classes.description}>{props.meal.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id} name={props.name}/>
        </div>
    </li>
};

export default MealItem;
