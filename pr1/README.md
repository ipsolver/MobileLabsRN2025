# 📱 FirstMobileApp

**FirstMobileApp** – це мобільний додаток, створений у середовищі **Snack** на базі **React Native**.  
Додаток містить кілька сторінок та реалізує навігацію між ними.

Розробник `Ліщинський Вадим, ІПЗк-24-1`
<hr>

## Технології та середовище
- **Snack (Expo)** – розробка та тестування
- **React Native** – основа для кросплатформенного додатку
- **React Navigation** – для управління переходами між екранами

## Використані пакети
```json
{
  "expo": "~52.0.37",
  "expo-status-bar": "~2.0.1",
  "react": "18.3.1",
  "react-native": "0.76.7",
  "@expo/vector-icons": "^14.0.2",
  "react-native-paper": "4.9.2",
  "react-native-screens": "~4.4.0",
  "@react-navigation/stack": "latest",
  "react-native-reanimated": "~3.16.1",
  "@react-navigation/native": "latest",
  "react-native-gesture-handler": "~2.20.2",
  "@react-navigation/bottom-tabs": "latest",
  "@react-navigation/native-stack": "latest",
  "react-native-safe-area-context": "4.12.0"
}
```
## Основні сторінки

- **Головна** – стартовий екран із стрічкою новин
- **Галерея** – перегляд зображень
- **Профіль** – форма для реєстрації користувача

## Встановлення та запуск локально

````bash
  git clone https://github.com/ipsolver/MobileLabsRN2025.git
````
````bash
    cd pr1
````

### Переконайтеся що у вас встановлені всі залежності
- `Node.js`
- `Android studio`
- `JDK` (можливо інші кросплатформенні виконавчі пакети)

````bash
    npm install
````
Запустити Expo
````bash
    npm start
````
або
````bash
    expo start
````
### Запустити на пристрої або емуляторі

- `На телефоні:` Відскануй QR-код у Expo Go (Android/iOS)
- `На вебі:` Натисни w в терміналі
- `На емуляторі:`
- - #### Android: npx expo run:android
- - #### iOS (на Mac): npx expo run:ios (потрібен Xcode)

## Скріншоти
- Головна сторінка
  
![image](https://github.com/ipsolver/MobileLabsRN2025/blob/lab1/pr1/screenshots/screen1.jpg)
- Галерея

![image](https://github.com/ipsolver/MobileLabsRN2025/blob/lab1/pr1/screenshots/screen2.jpg)
- Реєстрація

![image](https://github.com/ipsolver/MobileLabsRN2025/blob/lab1/pr1/screenshots/screen3.jpg)
