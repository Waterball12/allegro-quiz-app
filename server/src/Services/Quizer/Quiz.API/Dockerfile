#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Services/Quizer/Quiz.API/Quizzer.API.csproj", "Services/Quizer/Quiz.API/"]
COPY ["Services/Quizer/Quiz.Infrastructure/Quizzer.Infrastructure.csproj", "Services/Quizer/Quiz.Infrastructure/"]
COPY ["Services/Quizer/Quiz.Domain/Quizzer.Domain.csproj", "Services/Quizer/Quiz.Domain/"]
RUN dotnet restore "Services/Quizer/Quiz.API/Quizzer.API.csproj"
COPY . .
WORKDIR "/src/Services/Quizer/Quiz.API"
RUN dotnet build "Quizzer.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Quizzer.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Quizzer.API.dll"]