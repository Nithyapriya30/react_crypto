import React, { useState } from 'react';
import { Row, Col, Card, Typography, Avatar, Select } from 'antd';
import moment from 'moment';
import { Option } from 'antd/es/mentions';
import { useGetCryptosQuery } from '../services/cryptoapi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';


const { Title, Text } = Typography;

const News = ({ simplified }) => {
  const[newsCategory,setNewsCategory] = useState('cryptocurrency')

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory, 
    count : simplified ? 6 : 9,

   
  });
  const {data} = useGetCryptosQuery(300);

  console.log('Component rendering');
  console.log('cryptoNews:', cryptoNews);


  // Accessing the array of news articles
  
  const newsArray = cryptoNews?.data ? (simplified ? cryptoNews.data.slice(0, 6) : cryptoNews.data) : [];
  if (!newsArray.length) {
    console.log('No news available');
    return 'No news available';
  }

  return (
    <>
    {!simplified &&(
      <Typography.Title level={2} className="heading">Crypto-News</Typography.Title>
  )}
    <Row gutter={[24, 24]}>

     {!simplified && (
      <Col  span={24}>
        <Select
        showSearch
        className='select-news'
        placeholder="Select a Crypto"
        optionFilterProp='children'
        onChange={(value)=> setNewsCategory(value)}
        filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}

        >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin)=> <Option value={'blockchain'+coin.name}>{coin.name}</Option>)}
          </Select>
      </Col>
     )}

      {newsArray.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
            
              
                <Title style={{fontSize:'1rem'}} /* className="news-title" */ >{news.title}</Title>
               
              <img
                  src={news?.favicon || 'default-favicon-url.png'}
                  alt={news.name}
                  style={{ maxWidth: '100px', maxHeight: '75px'}}
                /> 
              
              </div>
              <p>
                {news.description && news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description || 'No description available'}
              </p>
              <div className="provider-container">
                
             
               
                <Text  style={{paddingBottom:'1rem'}} className="provider-name">{news.name || 'Unknown Source'}</Text>
                
              </div>
         <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-between' }}>
        <div> <Avatar src={news.logo} alt="none" /> <br /></div>
        <div> <Text style={{paddingTop:'1rem', fontSize:'0.9rem'}}>{moment().startOf('ss').fromNow()}</Text></div>
         </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
    </>
  );
};

export default News;