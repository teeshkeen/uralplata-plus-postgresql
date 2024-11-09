import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categoryAPI, productAPI } from '../../../shared/services/api';
import NomenclatureCard from '../../../features/nomenclature/ui/NomenclatureCard';
import NomenclatureTitle from './NomenclatureTitle';

const NomenclatureList = () => {
  const [category, setCategory] = useState({
    name: '',
    cost: '',
    typeCostFirst: '',
    typeCostSecond: '',
    products: []
  });
  const { id } = useParams();
  const [visibleCount, setVisibleCount] = useState(5); // Количество видимых карточек

  useEffect(() => {
    loadCategoryAndProducts();
  }, [id]);

  const loadCategoryAndProducts = async () => {
    try {
      const categoryResponse = await categoryAPI.getCategories();
      const currentCategory = categoryResponse.data.categories.find(cat => cat.id === parseInt(id));
      
      if (!currentCategory) {
        console.error('Category not found');
        return;
      }

      const productsResponse = await productAPI.getProductsByCategoryId(id);
      
      setCategory({
        ...currentCategory,
        products: productsResponse.data.products || []
      });
      
    } catch (error) {
      console.error('Error loading category and products:', error);
    }
  };

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 5); // Увеличиваем количество видимых карточек
  };

  return (
    <>
      <NomenclatureTitle title={category.name} cost={category.cost} />
      <div className="">
        <div className='space-y-4 mb-16 1440:hidden'>
          {category.products.slice(0, visibleCount).map(product => (
            <NomenclatureCard 
              key={product.id} 
              title={product.name} 
              desc={product.desc} 
              countType={product.countType} 
              typeCostFirst={category.typeCostFirst}
              typeCostSecond={category.typeCostSecond}
              image={product.imageUrl} 
              costFirst={product.costFirst} 
              costSecond={product.costSecond}
            />
          ))}
          {visibleCount < category.products.length && ( // Проверяем, есть ли скрытые карточки
            <button 
              onClick={handleShowMore} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Показать еще
            </button>
          )}
        </div>

        <div className="hidden w-min flex-col justify-start items-start gap-10 1440:inline-flex mb-16">
          <div className="self-stretch justify-start items-center gap-[60px] inline-flex">
            <div className="w-[260px] text-[#212121] text-xl font-gilroyMedium">Фото детали</div>
            <div className="justify-start items-center gap-5 flex">
              <div className="w-[380px] text-[#212121] text-xl font-gilroyMedium">Наименование</div>
              <div className="w-[220px] text-[#212121] text-xl font-gilroyMedium">Ед.Изм.</div>
              <div className="w-[220px] text-[#212121] text-xl font-gilroyMedium">{category.typeCostFirst}</div>
              <div className="w-[220px] text-[#212121] text-xl font-gilroyMedium">{category.typeCostSecond}</div>
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-5 flex">
            {category.products.slice(0, visibleCount).map(product => (
              <NomenclatureCard 
                key={product.id} 
                title={product.name} 
                desc={product.desc} 
                countType={product.countType} 
                typeCostFirst={category.typeCostFirst}
                typeCostSecond={category.typeCostSecond}
                image={product.imageUrl} 
                costFirst={product.costFirst} 
                costSecond={product.costSecond}
              />
            ))}
            {visibleCount < category.products.length && ( // Проверяем, есть ли скрытые карточки
              <button 
                onClick={handleShowMore} 
                className="bg-blue- 500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Показать еще
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NomenclatureList;