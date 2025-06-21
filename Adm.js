// Games e ADM
import {text} from "@clack/prompts";
import { readFileSync, writeFileSync} from "fs"
const log = console.log;  


const admGTA = "2702";
const admRacer = "1412" 
const passwordGTA = admGTA;
const passwordRacer = admRacer;




function changePlayers(path){ 
    const raw = (readFileSync(path, "utf-8"))
    return raw ? JSON.parse(raw) : {};
}

function savePlayers(path, data){
    writeFileSync(path, JSON.stringify(data, null, 2))
}

// para carregar os dados do arquivo
let playersGTA = changePlayers("playersGTA.json");
let playersRacer = changePlayers("playersRacer.json");

try{
function getNextPlayerKeyG(playersGTA){
    let g = 1;
    while (playersGTA[`player${g}`]){
        g++
    }
    return `playerGTA${g}`
}
getNextPlayerKeyG(playersGTA)
    
//O mesmo para racer

function getNextPlayerKeyRacer(playersRacer){
    let r = 1;
    while (playersRacer[`playerRacer${r}`]){
        r++
    }
    return `playerRacer${r}`
}
getNextPlayerKeyRacer(playersRacer)




log("Seja bem-vindo(a) aos arquivos dos jogos");

const Game = await text ({message: "Qual jogo você deseja ver ou modficar os arquivos?"})
switch(Game){
    case "GTA":{
        log("Você escolheu GTA")
        
        let tentativas = 0;
        let acessoLiberadoG = false;

            while(tentativas < 4) {
                const codigo = await text ({message: "digite seu código adm:"})
                
                if (codigo === passwordGTA){
                    log("Acesso liberado, logo você será redirecionado.")
                    acessoLiberadoG = true;
                    break;
                
                }else {
                    log("Código incorreto tente novamente") // senha iincorreta
                tentativas ++;
                log(`Você já tentou ${tentativas} vezes, lembre-se que você só tem 4 chances de acertar o código. TRABALHA ESSA MENTE!!`)
                }
                
            }
            if(!acessoLiberadoG){
                log("Máximo de tentativas alcançadas. Tente novamente mais tarde")
            }

            log("[1] Adicionar players");
            log("[2] Exluir players");
            const servico = await text({message:"Qual serviço você deseja executar?"});
            switch(servico){
                case "1":{ // ADICIONAR  PLAYER
                    while(true) {
                    log(`Os players atuais são:`)
                    log(playersGTA)
                    const whoG = await text ({message: "Digite o UserName do player que você deseja adicionar:"})
                    
                    const newKey = getNextPlayerKeyG(playersGTA) // Para conceder acesso ao usuário a modificar os players de gta
                    
                    playersGTA[newKey] = {
                        Username: whoG,
                        life: 100,
                        hunger: 0,
                        thirst: 0
                    };
                    
                    savePlayers("playersGTA.json",playersGTA)
                    log("Novo player adicionado com sucesso!")
                    log(playersGTA)
                    const morePlayersGTA = await text ({message: "Você deseja adicionar mais alguém?"})
                    if (morePlayersGTA.toLowerCase() !== "sim"){
                        break;
                    } 
                } // fim do whille
                    
                    break; // break de Modificar player / switch  serviço
                    }
                case "2":{
                    log(`Os players atuais são:`)
                    for (const key in playersGTA){
                        log(`${key}: ${playersGTA[key].Username}`)
                    }

                    const whoRemoveG = await text ({message:"Digite a chave (ex: playerOne) do player que você deseja remover"})
                    if (playersGTA[whoRemoveG]){
                        delete playersGTA[whoRemoveG];
                        savePlayers("playersGTA.json", playersGTA)
                        log("Usuário excluido com sucesso");
                        log(playersGTA)
                    } else {
                        log("Chave não encontrada, nenhum usuário foi exluído")
                        log(playersGTA)
                        break;
                    }
                } // fim case 2

            } // fim do switch de exluir ou add players no gta

        }
        break; // break entre gta e Racer

        case "Racer":{
            log("Você escolheu Racer")
        
        let tentativas = 0;
        let acessoLiberadoR = false;

            while(tentativas < 4) {
                const codigo = await text ({message: "digite seu código adm:"})
                
                if (codigo === passwordRacer){  // acesso liberado a aba de controle do jogo racer
                log("Acesso Liberado, logo você redirecionado(a).")
                acessoLiberadoR= true;
                break;

                }else {
                    log("Código incorreto tente novamente") // senha incorreta
                tentativas ++;
                log(`Você já tentou ${tentativas} vezes, lembre-se que você só tem 4 chances de acertar o código. TRABALHA ESSA MENTE!!`)
                }
            }

            if(!acessoLiberadoR){
                log("Máximo de tentativas alcançadas. Tente novamente mais tarde") // máximo de tentativas alcançadas. Acaba o programa
            }

            log("[1] Adicionar players");
            log("[2] Exluir players");
            const servico = await text({message:"Qual serviço você deseja executar?"});
            switch(servico){
                case "1":{ // ADICIONAR  PLAYER
                    while(true){
                        log(`Os players atuais são:`)
                    log(playersRacer)
                    const whoR = await text ({message: "Digite o UserName do player que você deseja adicionar:"})
                    
                    const newKey = getNextPlayerKeyR(playersRacer) // Para conceder acesso ao usuário a modificar os players de gta e aumentar mais um na quantidade de key
                    
                    playersRacer[newKey] = {
                        Username: whoR,
                        life: 100,
                        hunger: 0,
                        thirst: 0
                    };
                    
                    savePlayers("playersRacer.json", playersRacer)
                    log("Novo player adicionado com sucesso!")
                    log(playersRacer)
                    const morePlayersRacer = await text ({message: "Você deseja adicionar mais alguém?"})
                    if (morePlayersRacer.toLowerCase() !== "sim"){
                        break;
                    } 
                    break;
                    }
                     // break de Modificar player / switch  serviço
                    }
                case "2":{
                    log(`Os players atuais são:`)
                    for (const key in playersRacer){
                        log(`${key}: ${playersRacer[key].Username}`)
                    }

                    const whoRemoveR = await text ({message:"Digite a chave (ex: playerOne) do player que você deseja remover"})
                    
                    if (playersRacer[whoRemoveR]){ // se players racer tiver algum user que a kaey seja igual a q o usuário inseriu = true
                        delete playersRacer[whoRemoveR];
                        savePlayers("playersRacer.json", playersRacer)
                        log("Usuário excluido com sucesso");
                        log(playersRacer)
                    } else {
                        log("Chave não encontrada, nenhum usuário foi exluído")
                        log(playersRacer)
                        break;
                    }
                } // fim case 2

                default:
                        log("Opção inválida.")
                        break;
            } // fim do switch de exluir ou add players no Racer
            break; // break do racer 
        } // o case racer acaba aqui
        

        default: // defult caso o usuário insira uma palavra diferente das opções de jogos
            log("Jogo não reconhecido");
}
log("Fim")

} catch(error){
    log("❌ Ocorreu um erro inerperado");
    log(error.message || err)
}
