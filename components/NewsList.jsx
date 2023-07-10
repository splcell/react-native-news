import { View, ScrollView} from "react-native";
import NewsItem from "./NewsItem";
import { useContext } from "react";
// import { NewsContext } from "../App";
import { NewsContext } from "../screens/NewsScreen";
import { FlatList, RefreshControl  } from "react-native";


function NewsList() {
  const { news, isLoading, getNews } = useContext(NewsContext);

  return (
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getNews} />}
        data={news}
        renderItem={({ item }) => <NewsItem {...item} />}
        keyExtractor={item => item.id}
        style={{ height: "auto" }}
      />
  );
}

export default NewsList;
