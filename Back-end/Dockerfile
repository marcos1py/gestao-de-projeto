# Etapa de build: utiliza imagem do Maven para compilar a aplicação
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
# Copia o arquivo pom.xml e baixa as dependências (cache do Maven)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o restante do código-fonte
COPY src ./src
# Compila e gera o arquivo .jar (pulando os testes, ajuste se necessário)
RUN mvn clean package -DskipTests

# Etapa final: imagem reduzida com o JDK para rodar a aplicação
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copia o .jar compilado da etapa anterior (ajuste o nome se necessário)
COPY --from=build /app/target/*.jar app.jar
# Expondo a porta padrão do Spring Boot
EXPOSE 8080
# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
