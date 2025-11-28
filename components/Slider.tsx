import { stylesRoot } from "@/constants/variables";
import { useAppContext } from "@/contexts/userContext";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const SLIDE_HEIGHT = 300;

interface SlideItem {
  id: string;
  title: string;
  image: string;
}

export default function HomeSlider() {
  const { theme } = useAppContext();
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Busca dados de comida da API TheMealDB
  useEffect(() => {
    async function getData() {
      try {
        // Buscar várias categorias de comida para ter mais variedade no slider
        const categories = ["Dessert", "Seafood", "Vegetarian", "Chicken", "Beef"];
        const responses = await Promise.all(
          categories.map((category) =>
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
          )
        );
        
        const dataArrays = await Promise.all(
          responses.map((res) => res.json())
        );
        
        // Pegar o primeiro item de cada categoria para o slider
        const slides: SlideItem[] = [];
        dataArrays.forEach((data) => {
          if (data.meals && data.meals.length > 0) {
            const meal = data.meals[0];
            slides.push({
              id: meal.idMeal,
              title: meal.strMeal,
              image: meal.strMealThumb,
            });
          }
        });

        setSlides(slides);
      } catch (error) {
        console.error("Erro ao buscar dados do slider:", error);
      }
    }
    getData();
  }, []);

  // 2. Auto-Play com Correção de Bug
  useEffect(() => {
    if (slides.length === 0) return;

    const intervalId = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }

      // Rola a lista visualmente
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      // Atualiza o estado da bolinha
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [activeIndex, slides.length]);

  // 3. Sincroniza se o usuário arrastar com o dedo
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  // Navega para a página de produtos de comida
  const handleSlidePress = () => {
    router.push("/market/food" as any);
  };

  // Renderização de cada Slide
  const renderItem = ({ item }: { item: SlideItem }) => (
    <TouchableOpacity
      style={{ width: width, height: SLIDE_HEIGHT }}
      onPress={handleSlidePress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.image }}
        style={localStyles.image}
        resizeMode="cover"
      />
      <View style={localStyles.overlay}>
        <View
          style={[
            localStyles.typeBadge,
            {
              backgroundColor: "rgba(255, 152, 0, 0.8)",
            },
          ]}
        >
          <Text style={localStyles.typeBadgeText}>Comida</Text>
        </View>
        <Text
          style={{
            color: "#fff",
            fontSize: stylesRoot.fontSize.l,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        stylesRoot.containers.fill,
        { backgroundColor: theme.background },
      ]}
    >
      {/* --- SEÇÃO DO CARROSSEL --- */}
      <View style={{ height: SLIDE_HEIGHT, width: "100%" }}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item, index) => `food-${item.id}-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          // CORREÇÃO DO BUG: Ensina ao FlatList o tamanho dos itens para o scroll funcionar
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />

        {/* Paginação (Bolinhas) */}
        <View style={[stylesRoot.containers.row, localStyles.pagination]}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                height: 8,
                width: index === activeIndex ? 24 : 8, // Animação de largura
                borderRadius: stylesRoot.radius.circle,
                backgroundColor:
                  index === activeIndex
                    ? theme.primary
                    : "rgba(255,255,255,0.5)",
                marginHorizontal: stylesRoot.spacing.xs,
              }}
            />
          ))}
        </View>
      </View>

      {/* --- CONTEÚDO DA HOME --- */}
      <View
        style={[
          stylesRoot.containers.center,
          { padding: stylesRoot.spacing.l },
        ]}
      >
        <Text
          style={{
            color: theme.text,
            fontSize: stylesRoot.fontSize.xl,
            fontWeight: "bold",
            marginBottom: stylesRoot.spacing.s,
          }}
        >
          Bem-vindo ao simulador de compras!
        </Text>

        <Text
          style={{
            color: theme.inputPlaceholder,
            fontSize: stylesRoot.fontSize.s,
            textAlign: "center",
            marginBottom: stylesRoot.spacing.xl,
          }}
        >
          Explore nossa variedade de produtos e simule suas compras de forma
          prática e divertida.
        </Text>

        {/* Botão usando padrões do projeto */}
        <TouchableOpacity
          style={[
            stylesRoot.containers.center,
            {
              backgroundColor: theme.buttonBackground,
              paddingVertical: stylesRoot.spacing.m,
              paddingHorizontal: stylesRoot.spacing.xl,
              borderRadius: stylesRoot.radius.m,
              width: "100%",
            },
          ]}
          onPress={() => router.push("/market/food")}
        >
          <Text
            style={{
              color: theme.buttonText,
              fontSize: stylesRoot.fontSize.m,
              fontWeight: "bold",
            }}
          >
            Ver todas as receitas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos locais ajustados para corrigir o bug de sobreposição
const localStyles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // Fundo escuro transparente

    // --- A MÁGICA ACONTECE AQUI ---
    // Adicionamos padding normal nas laterais/topo
    paddingHorizontal: stylesRoot.spacing.m,
    paddingTop: stylesRoot.spacing.m,

    // E um padding GIGANTE em baixo para "reservar" espaço para os dots
    paddingBottom: stylesRoot.spacing.xxl,

    justifyContent: "flex-end", // Garante que o conteúdo fique alinhado
    alignItems: "center",
  },
  pagination: {
    position: "absolute",
    // Os dots ficam exatamente dentro daquele espaço reservado pelo paddingBottom do overlay
    bottom: stylesRoot.spacing.m,
    width: "100%",
    justifyContent: "center",
  },
  typeBadge: {
    paddingHorizontal: stylesRoot.spacing.m,
    paddingVertical: stylesRoot.spacing.xs,
    borderRadius: stylesRoot.radius.m,
    marginBottom: stylesRoot.spacing.s,
    alignSelf: "center",
  },
  typeBadgeText: {
    color: "#fff",
    fontSize: stylesRoot.fontSize.s,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
