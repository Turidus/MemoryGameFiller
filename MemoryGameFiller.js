/*
Geschrieben von Turidus
*/

importPackage(Packages.com.sk89q.worldedit)
importPackage(Packages.com.sk89q.worldedit.blocks);

function shuffle(array) { //Wie eine Liste gewürfelft wird in 12 Zeilen. Nicht anfassen!
    currentIndex = array.length;
    temporaryValue = 0;
    randomIndex = 0;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//VARIABLEN

//Liste aller Blöcke die am Ende im Memoryspiel auftauchen können. Nach Bedarf anpassen.
useableBlocks = [
                    new BaseBlock(BlockID.COAL_BLOCK, 0),new BaseBlock(BlockID.DIAMOND_BLOCK, 0),new BaseBlock(BlockID.IRON_BLOCK, 0),           //Ressourcenblöcke
                    new BaseBlock(BlockID.EMERALD_BLOCK, 0),new BaseBlock(BlockID.GOLD_BLOCK, 0),new BaseBlock(BlockID.LAPIS_LAZULI_BLOCK, 0),
                    new BaseBlock(BlockID.QUARTZ_BLOCK, 0),
                    new BaseBlock(BlockID.CLOTH, 0),new BaseBlock(BlockID.CLOTH, 1),new BaseBlock(BlockID.CLOTH, 2),                    //Wolle in allen Farben
                    new BaseBlock(BlockID.CLOTH, 3),new BaseBlock(BlockID.CLOTH, 4),new BaseBlock(BlockID.CLOTH, 5),
                    new BaseBlock(BlockID.CLOTH, 6),new BaseBlock(BlockID.CLOTH, 7),new BaseBlock(BlockID.CLOTH, 8),
                    new BaseBlock(BlockID.CLOTH, 9),new BaseBlock(BlockID.CLOTH, 10),new BaseBlock(BlockID.CLOTH, 11),
                    new BaseBlock(BlockID.CLOTH, 12),new BaseBlock(BlockID.CLOTH, 13),new BaseBlock(BlockID.CLOTH, 14),
                    new BaseBlock(BlockID.CLOTH, 15),
                    new BaseBlock(BlockID.COAL_ORE, 0),new BaseBlock(BlockID.DIAMOND_ORE, 0),new BaseBlock(BlockID.IRON_ORE, 0),           //Erze
                    new BaseBlock(BlockID.REDSTONE_ORE, 0),new BaseBlock(BlockID.EMERALD_ORE, 0),new BaseBlock(BlockID.GOLD_ORE, 0),
                    new BaseBlock(BlockID.LAPIS_LAZULI_ORE, 0),new BaseBlock(BlockID.QUARTZ_ORE, 0),
                    new BaseBlock(BlockID.SANDSTONE, 1),                                                                                //Sandstein
                    new BaseBlock(BlockID.LOG, 0),new BaseBlock(BlockID.LOG, 1),new BaseBlock(BlockID.LOG, 2),                          //HolzSTÄMME
                    new BaseBlock(BlockID.LOG, 3),
                    new BaseBlock(BlockID.WOOD, 0),new BaseBlock(BlockID.WOOD, 1),new BaseBlock(BlockID.WOOD, 2),                       //HolzPLANKEN
                    new BaseBlock(BlockID.WOOD, 4),new BaseBlock(BlockID.WOOD, 5),
                    new BaseBlock(BlockID.STONE, 0),new BaseBlock(BlockID.STONE, 1),new BaseBlock(BlockID.STONE, 2),                    //Stein (Cleanstone)
                    new BaseBlock(BlockID.STONE, 3),new BaseBlock(BlockID.STONE, 5),new BaseBlock(BlockID.STONE, 6),
                    new BaseBlock(BlockID.COBBLESTONE, 0),                                                                              //Bruchstein (COBBLESTONE))
                    new BaseBlock(BlockID.DIRT, 0)                                                                                      //Erde
                    ];
                    
player.print(useableBlocks.length)


finalBlocklist = [] //Liste der Blöcke die dann wirklich auftauchen

hight = 14; //Die Anzahl an senkrechten Memoryfeldern. Nach Bedarf anpassen
wide = 7; //Die Anzahl an wagrechten Memoryfeldern. Nach Bedarf anpassen

size = hight * wide; //DARF NICHT GRÖßER ALS 2 X DIE ANZAHL VON ELEMENTEN IN useableBlocks SEIN, MUSS GERADE SEIN! (3 X DIE ANZAHL UND DURCH DREI TEILBAR BEI TRIPLETS)

startVector = new Vector (10,10,0); //Die Koordinanten des untersten linken Feldes, bildet den Ausgangsvektor

for (in1 = 0; in1 < size/2; in1++){ //Füllt die Liste der am Ende vom Spiel genutzten Blöcke paarweise. Ist diese Liste voll wird der Rest der useableBlocks Liste verworfen.
    newInsert = useableBlocks[in1];
    finalBlocklist.push(newInsert);
    finalBlocklist.push(newInsert);
};

finalBlocklist = shuffle(finalBlocklist); //Würfelt die endgültige Liste.

session = context.remember(); //WorldEdit Umgebung

for (in2 = 0; in2 < wide; in2++){ //Schleifen über das ganze Memoryspiel
    for (in3 = 0; in3 < hight; in3++){
        
        block = finalBlocklist.pop(); //Entfernt einen Block aus der Liste und merkt sich den Block
        
        vec = new Vector(in2 * 2,in3 * 3,0); /*Hier ist die Geometrie des Memoryspiels festgelegt, in zum Ausgangsvektor relativen (x, y, z) Koordinaten.
                                                Wenn das untereste linke Feld auf den Koordinanten (10,10,10) liegt, das Feld rechts daneben auf (12,10,10)
                                                und das Feld darüber auf (10,13,10), muss der die Relation so ausehen: (in2 * 2, in3 * 3, in2 * 0).
                                                
                                                Wenn das untereste linke Feld auf den Koordinanten (10,10,10) liegt, das Feld rechts daneben auf (10,10,7)
                                                und das Feld darüber auf (10,15,10), muss der die Relation so ausehen: (in2 * 0, in3 * 5, in2 * -3).
                                                
                                                in2 * 0 kürzt sich dabei auf 0.
                                                */
        
        targetVector = startVector.add(vec); //Die finalen Koordinaten.
        session.setBlock(targetVector, block); //Setzt den Block.
        
    };
};


