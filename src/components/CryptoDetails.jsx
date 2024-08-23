import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Select, Typography, Spin, Row } from 'antd';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoapi';
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StockOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import LineChart from './LineChart';



const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();  // coinId should be the UUID
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data: cryptoHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

  const time = ['24h', '7d', '30d', '3m', '1y', '5y'];

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Spin style={{marginTop:'1.2rem'}} tip="Loading..." />;

  if (!cryptoDetails) return <div>Unable to load cryptocurrency details.</div>;


  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'Changes', value: ` ${cryptoDetails?.change && millify(cryptoDetails?.change)} %`, icon: <StockOutlined />},
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
  
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  const sparkline = cryptoHistory?.data?.history.map((point) => point.price);
  return (
    <>
      <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </Title>
          <p>
            {cryptoDetails.name} live price in US Dollars. View Market statistics, Volume, Marketcap and supply.
          </p>
        </Col>
        <Select
        //defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select time period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
    
      <LineChart sparkline={sparkline} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
        <Col style={{ marginTop: '1.5rem' }} className='stats-container'>
          <Col className='coin-value-statistics'>
            <Col className='cloin-value=statistics-heading'>
              <Title level={3} className='coin-detailes-heading'>
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className='coin-stats' key={title}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text style={{ paddingRight: '1.5rem' }}>{title}</Text>
                </Col>
                <Text className='stats'>
                  {value}
                </Text>
              </Col>
            ))}
          </Col>

          <Col className='other-stats-info'>
            <Col className='cloin-value=statistics-heading'>
              <Title level={3} className='coin-detailes-heading'>
                Other Statistics
              </Title>
              <p>
                An overview showing the stats of all cryptocurrencies
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className='coin-stats' key={title}>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>
                  {value}
                </Text>
              </Col>
            ))}
          </Col>
        </Col>

        <Col style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <Row>
            <Title level={3} className='coin-details-heading'>
              What is {cryptoDetails.name}?
              <p style={{ color: 'black', marginTop: '1rem', fontSize: '1rem', fontStyle: 'normal' }}>
                {HTMLReactParser(cryptoDetails.description || '')}
              </p>
            </Title>
          </Row>
        </Col>
        <Col className='coin-links'>
          <Title className='coin-details-heading' level={3}>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetails;