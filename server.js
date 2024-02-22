const ENDPOINT = "https://we405ziwwg.execute-api.ap-south-1.amazonaws.com/prod";
const ConnectToDb = require("./mongodb/mongo_connect");
const { ApiGatewayManagementApi } = require('@aws-sdk/client-apigatewaymanagementapi');
const client = new ApiGatewayManagementApi({ endpoint: ENDPOINT });
const Teams = require('./mongodb/schemas/team')

const {AddConnectionFromMongoDB,removeConnectionFromMongoDB,GetAllConnectionsFromMongoDB ,removeAllConnectionsFromMongoDB}= require('./connect');






ConnectToDb();

  const getAllTeams = async () => {
    try {
      const orders = await Teams.find().select('-team_id').exec();
      return orders;
    } catch (err) {
      console.error("Error fetching Teams:", err);
      throw err;
    }
  };
  
  const sendToOne = async (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        await client.postToConnection({
          'ConnectionId': id,
          'Data': Buffer.from(JSON.stringify(body))
        }, async (err, data) => {
          if (err) {
            console.error(`Error for connection ID ${id}:`, err);
  
            if (err.statusCode === 410) {
              console.log("Connection is gone, treating as success.");
  
              await removeConnectionFromMongoDB(id);
            }
  
     
  
            resolve(data);
          } else {
            console.log("Message sent successfully");
            resolve(data);
          }
        });
      } catch (err) {
        console.error(`Error for connection ID ${id}:`, err);
  
      
        await removeConnectionFromMongoDB(id);
  
        reject(err);
      }
    });
  };
  
  
  
  const sendToAll = async (ids, body) => {
    const all = ids.map(i => sendToOne(i, body));
    return Promise.all(all);
  };
  
exports.handler = async (event) => {
  if (event.requestContext) {
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;
    let body = {};
    try {
      if (event.body) {
        body = JSON.parse(event.body);
      }
    } catch (err) {
      console.log(err);
    }

    switch (routeKey) {
      case '$connect':
        try {
          
            await AddConnectionFromMongoDB(connectionId);
            
            
            console.log('Connection established:', connectionId);
          
        } catch (err) {
          console.error('Error during connection:', err);
        }
        break;
      
        case '$disconnect':
          try {
            await removeConnectionFromMongoDB(connectionId);
            console.log('Connection disconnected:', connectionId);
          } catch (err) {
            console.error('Error removing connection from MongoDB:', err);
          }
          break;
        
      case '$default':
        break;
      case 'setName':
        names[connectionId] = body.name;
        break;
      case 'sendPublic':
        // const newNotifications = await getAllNotifications();
        // const connectedClients1 = await GetAllConnectionsFromMongoDB();
        // console.log(newNotifications)
        // console.log(connectedClients1)


        // await sendToAll(connectedClients1, { publicMessage: newNotifications });
        break;
      case 'sendPrivate':
        const newTeam = await getAllTeams();
        const connectedClients2 = await GetAllConnectionsFromMongoDB();
        console.log(newTeam)
        console.log(connectedClients2)
        await sendToAll(connectedClients2, { newTeam }); break;

      default:
        break;
    }



    const response = {
      statusCode: 200,
      body: JSON.stringify("hello"),
    };
    return response;
  }
};

module.exports.GetAllConnectionsFromMongoDB = GetAllConnectionsFromMongoDB;
module.exports.sendToAll = sendToAll;
