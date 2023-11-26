function WarrantyHistory() {
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading((prevLoading) => !prevLoading);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start(() => {
      spinValue.setValue(0);
    });
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <ActivityIndicator size="large" color={colorBlue} animating={loading} />
      </Animated.View>
      <View
        style={{
          marginTop: 16,
          width: "80%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            marginTop: 16,
            fontSize: 16,
            color: "black",
            textAlign: "center"
          }}
        >
          Dữ liệu đang được đồng bộ. Qúa trình này có thể diễn ra trong ít phút.
          Sẽ thông báo tới anh/chị khi hoàn thành.
        </Text>
      </View>
    </View>
  );
}