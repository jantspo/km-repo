import Carousel from 'react-bootstrap/Carousel';
import Testimonial from './Testimonial';

export default function Testimonials () {
    const testimonials = [
        {
            image: '/images/Bitmap.png',
            name: 'John Smith',
            company: 'Blacksmith',
            content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores dicta, dolor asperiores, iusto ratione nam repellat nulla in tenetur velit aperiam numquam sequi! Dolores, atque optio. Dicta vel molestias amet!'
        },
        {
            image: '/images/Bitmap.png',
            name: 'SW Jackson',
            company: 'Amazing Homes',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ex maiores dignissimos deserunt aspernatur recusandae asperiores pariatur porro harum, voluptate eligendi, accusantium odio reiciendis ratione qui iste alias esse. Voluptates!'
        },
        {
            image: '/images/Bitmap.png',
            name: 'Karl Franz',
            company: 'EE',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ex maiores dignissimos deserunt aspernatur recusandae asperiores pariatur porro harum, voluptate eligendi, accusantium odio reiciendis ratione qui iste alias esse. Voluptates!'
        }
    ];
    return (
        <Carousel>
            {
                testimonials.map((test, ind)=>{
                    return <Carousel.Item key={ind}>
                            <Testimonial image={test.image} name={test.name} company={test.company} blurb={test.content} />
                        </Carousel.Item>
                })
            }
        </Carousel>    
    )
}