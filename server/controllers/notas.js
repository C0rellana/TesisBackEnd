
class Notas {
    
    static List(req, res) {
       

        var {Notas, Porcentajes,notadeseada} =req.body;
        var p =[]
        var NotasP=[]

        for (let i = 0; i < Notas.length; i++) {     
            p=[]
            if(Notas[i]===''){ 
                for (let j = 10; j <= 70; j++) { 
                    p.push(j*Porcentajes[i]/100)    
                }
            }else{
                p.push(Notas[i]*Porcentajes[i]/100)       
            }
            NotasP[i]=p;
        }
        switch (Notas.length) {
            case 2:
                return res.json(Notas2(NotasP,Porcentajes,notadeseada));
            case 3:
                return res.json(Notas3(NotasP,Porcentajes,notadeseada));
            case 4:
                return res.json(Notas4(NotasP,Porcentajes,notadeseada));
            case 5:
                return res.json(Notas5(NotasP,Porcentajes,notadeseada));
            default:
                return res.send("error");
          }      
    }

}
function cartesian() {
    var r = [], arg = arguments, max = arg.length-2;
    notadeseada=parseInt(arg[max+1]);
    function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); 
            a.push(arg[i][j]);
            if (i==max){
               sum=a.reduce((a,b)=>a+b,0);
               if(Math.round(sum)===notadeseada){
                    r.push(a);
                }
            }
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

function Notas2(NotasP,Porcentajes,notadeseada){
    
    var result= cartesian(NotasP[0], NotasP[1],notadeseada); 
    var final = []
    for (let i = 0; i < result.length; i++) {
       let nota = result[i][0]+result[i][1]   
        final.push({"nota1":Math.trunc(result[i][0]/Porcentajes[0]*100),"nota2":Math.trunc(result[i][1]/Porcentajes[1]*100),"final":nota})
    
    }
   return(final)
}
function Notas3(NotasP,Porcentajes,notadeseada){

    var result= cartesian(NotasP[0], NotasP[1],NotasP[2],notadeseada); 
    var final = []
    for (let i = 0; i < result.length; i++) {
       let nota = result[i][0]+result[i][1]+result[i][2]
        final.push({"nota1":Math.trunc(result[i][0]/Porcentajes[0]*100),"nota2":Math.trunc(result[i][1]/Porcentajes[1]*100),"nota3":Math.trunc(result[i][2]/Porcentajes[2]*100),"final":nota})        
    }
   return(final)
}
function Notas4(NotasP,Porcentajes,notadeseada){

    var result= cartesian(NotasP[0], NotasP[1],NotasP[2],NotasP[3],notadeseada); 
    var final = []
    for (let i = 0; i < result.length; i++) {
       let nota = result[i][0]+result[i][1]+result[i][2]+result[i][3]

       final.push({"nota1":Math.trunc(result[i][0]/Porcentajes[0]*100),"nota2":Math.trunc(result[i][1]/Porcentajes[1]*100),"nota3":Math.trunc(result[i][2]/Porcentajes[2]*100),"nota4":Math.trunc(result[i][3]/Porcentajes[3]*100),"final":Math.round(nota)})

        
    }
   return(final)

}
function Notas5(NotasP,Porcentajes,notadeseada){
   
    var result= cartesian(NotasP[0], NotasP[1],NotasP[2],NotasP[3],NotasP[4],notadeseada); 
    var final = []
    for (let i = 0; i < result.length; i++) {
       let nota = result[i][0]+result[i][1]+result[i][2]+result[i][3]+result[i][4]
        final.push({"nota1":Math.trunc(result[i][0]/Porcentajes[0]*100),"nota2":Math.trunc(result[i][1]/Porcentajes[1]*100),"nota3":Math.trunc(result[i][2]/Porcentajes[2]*100),"nota4":Math.trunc(result[i][3]/Porcentajes[3]*100),"nota5":Math.trunc(result[i][4]/Porcentajes[4]*100),"final":Math.round(nota)})   
    }

   return(final)

}



module.exports = Notas
