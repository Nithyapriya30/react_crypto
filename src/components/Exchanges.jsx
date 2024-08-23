// src/components/Exchanges.js
import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Spin } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetExchangeInfoQuery } from '../services/exchangeApi';


const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangeInfoQuery();

  if (isFetching) return <Spin style={{marginTop:'1.2rem'}} tip="Loading..." />;

  if (!data || data.length === 0) {
    return <Text>No exchanges available.</Text>;
  }

  return (
    <>
     <Typography.Title level={2} className="heading" style={{marginBottom:'1.7rem'}}>
          Crypto-Exchange Markets
        </Typography.Title>
      <Row style={{marginBottom:'1rem'}}>
        <Col span={6}><strong>Exchange</strong></Col>
        <Col span={6}><strong>Trade Volume (BTC)</strong></Col>
        <Col span={6}><strong>Country</strong></Col>
        <Col span={6}><strong>Trust Score</strong></Col>
      </Row>
      {data.map((exchange) => (
        <Row key={exchange.id} style={{marginBottom:'0.5rem'}}>
          <Col span={24}>
            <Collapse>
              <Panel
                showArrow={false}
                header={(
                  <Row>
                    <Col span={6}>
                    <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                      
                    </Col>
                    <Col span={6}>{millify(exchange.trade_volume_24h_btc)} BTC</Col>
                    <Col span={6}>{exchange.country || 'N/A'}</Col>
                    <Col span={6}>{exchange.trust_score}/10</Col>
                  </Row>
                )}
              >
                <p><strong>Year Established:</strong> {exchange.year_established || 'N/A'}</p>
                <p>{HTMLReactParser(exchange.description || 'No description available.')}</p>
                <p><strong>Website:</strong> <a href={exchange.url} target="_blank" rel="noopener noreferrer">{exchange.url}</a></p>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Exchanges;