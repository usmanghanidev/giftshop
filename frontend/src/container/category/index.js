import { useState, useEffect } from 'react';
import Section from 'components/section';
import Card from 'components/card';
import API from 'endpoint';
import { Loader } from 'components/loading';
import { numberWithCommas } from 'utils/number-with-coma';
import { Title, Wrapper, LoadingBox } from './styles';
import { useCartContext } from 'context/AddToCartContext';

export default function Category({ title, type }) {
  const { fn } = useCartContext();

  const [state, setState] = useState({
    data: [],
    lading: true,
    error: null,
  });

  const get = async () => {
    try {
      const {
        data: { payload },
      } = await API.get(type ? `/gift/${type}` : '/gift');
      setState({
        ...state,
        data: payload,
        lading: false,
      });
    } catch (e) {
      console.error(e.message);
      setState({
        data: [],
        lading: false,
        error: e.message,
      });
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Section>
      <Title>{title}</Title>

      {state.lading ? (
        <LoadingBox>
          <Loader />
        </LoadingBox>
      ) : (
        <Wrapper>
          {state.data.map((el, idx) => {
            return (
              <Card
                key={idx}
                title={el.title}
                img={`${el.img}`}
                description={el.description}
                price={`$${numberWithCommas(el.price)}`}
                action={() => fn.addToCart({ cart: el })}
              ></Card>
            );
          })}
        </Wrapper>
      )}
    </Section>
  );
}
