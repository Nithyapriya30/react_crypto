import React from 'react'
import millify from 'millify';
import { Col, Row, Spin, Statistic, Typography } from 'antd';

import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import { useGetCryptosQuery } from '../services/cryptoapi';

const Homepage = () => {
   
    const {data,isFetching} = useGetCryptosQuery(12);
    const globalStats= data?.data?.stats;

    if(isFetching) return <Spin style={{marginTop:'1.2rem'}} tip="Loading..." />;
    


  return (
        <>
        
          <div>
    <Typography.Title level={2} className="heading">Global Crypto Stats</Typography.Title>
            <Row style={{padding:'0.5rem'}} className='spanmobile'>
            <Col xs={12} sm={8} md={8}><Statistic style={{paddingBottom:'1rem'}} title="Total Cryptocurrencies" value={globalStats.total}/></Col>
            <Col xs={12} sm={8} md={8}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
            <Col xs={12} sm={8} md={8}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
            <Col xs={12} sm={8} md={8}><Statistic title="Total 24hr Volume" value={millify(globalStats.total24hVolume)}/></Col>
            <Col xs={12} sm={8} md={8}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
            </Row>

            <div className="home-heading-container">
                    <Typography.Title level={2} className="home-title">Top 12 Cyptocurrencies in the world</Typography.Title>
                    <Typography.Title level={5} className="show-more"><Link to="/cryptocurrencies" >Show more</Link></Typography.Title>
            </div>

             <Cryptocurrencies simplified/>

             
             <div className="home-heading-container">
                    <Typography.Title level={2} className="home-title">Latest Crypto News</Typography.Title>
                    <Typography.Title level={5} className="show-more"><Link to="/news" >Show more</Link></Typography.Title>
            </div>

             <News simplified/> 
   </div>
        </>
   
  )

}

export default Homepage