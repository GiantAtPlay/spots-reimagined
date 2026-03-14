FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["src/Spots.Api/Spots.Api.csproj", "Spots.Api/"]
RUN dotnet restore "Spots.Api/Spots.Api.csproj"

COPY src/Spots.Api/ Spots.Api/
RUN dotnet build "Spots.Api/Spots.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Spots.Api/Spots.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=publish /app/publish .

RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

COPY src/Spots.App/package*.json /app/ui/
WORKDIR /app/ui
RUN npm install

COPY src/Spots.App/ /app/ui/
RUN npm run build

WORKDIR /app
EXPOSE 80
EXPOSE 443

ENTRYPOINT ["dotnet", "Spots.Api.dll"]
