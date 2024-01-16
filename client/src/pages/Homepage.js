import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd';
import { useDispatch } from 'react-redux';
import ItemList from '../components/ItemList';

const Homepage = () => {
    const [itemData,setItemData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('drinks')
    const categories = [
        {
            name:'drinks',
            imageUrl:"https://img.etimg.com/photo/msid-69212931,quality-100/chai-itself-was-once-a-trend-that-developed-this-way-.jpg"
        },
        {
            name:'rice',
            imageUrl:"https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot-featured.jpg"
        },
        {
            name:'noodles',
            imageUrl:"https://cravecookclick.com/wp-content/uploads/2012/07/IMG_4400.jpg"
        },
    ]
    const dispatch = useDispatch()

    useEffect(() => {
        const getAllItems = async () =>{
            try {
                dispatch({
                    type:'SHOW_LOADING'
                })
                const {data} = await axios.get('/api/items/get-item')
                setItemData(data)
                dispatch({
                    type: "HIDE_LOADING"
                })
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllItems()
    },[dispatch])
  return (
    <DefaultLayout>
        <div className='d-flex'>
            {
                categories.map((category) => (
                    <div key={category.name} className={`d-flex category ${
                        selectedCategory === category.name && 'category-active'
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                >
                        <h4>{category.name}</h4>
                        <img
                            src={category.imageUrl}
                            alt={category.name}
                            height='40'
                            width='60'
                        />
                    </div>
                ))
            }
        </div>
        <Row>
            {
                itemData.filter((i)=> i.category === selectedCategory)
                .map((item) =>(
                    <Col xs={24} lg={6} md={12} sm={6}>
                    <ItemList key={item.id} item={item}/>
                    </Col>
                ))
            }
        </Row>
    </DefaultLayout>
  )
}

export default Homepage