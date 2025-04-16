import CitiesList from '../../components/cities-list/cities-list';
import OffersList from '../../components/offers-list/offers-list';

function MainPage(): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList />
        </section>
      </div>
      <div className="cities">
        <OffersList />
      </div>
    </main>
  );
}

export default MainPage;
