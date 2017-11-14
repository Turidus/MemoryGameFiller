/*
https://github.com/Turidus/MemoryGameFiller

Script only works together with Mincraft, WorldEdit and the RIHNO Java Javascript engine (https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Download_Rhino)
For the usage of scripts with WorldEdit, see their wiki (http://wiki.sk89q.com/wiki/WorldEdit/Scripting)

It is written in an outdatet way and should never be used as example on how to write JS. 
*/

//IMPORTS

importPackage(Packages.com.sk89q.worldedit)
importPackage(Packages.com.sk89q.worldedit.blocks);


//FUNCTIONS

//Function to shuffle an array. Taken from https://stackoverflow.com/a/12646864, user Laurens Holst. Thanks.
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


//VARIABLES

//List of all blocks that CAN make it into the memory game. Can be modified as necessary
//provides enough blocks for a memory game with 98 fields as is
useableBlocks = [
                    new BaseBlock(BlockID.COAL_BLOCK, 0),new BaseBlock(BlockID.DIAMOND_BLOCK, 0),new BaseBlock(BlockID.IRON_BLOCK, 0),   //ressource blocks
                    new BaseBlock(BlockID.EMERALD_BLOCK, 0),new BaseBlock(BlockID.GOLD_BLOCK, 0),new BaseBlock(BlockID.LAPIS_LAZULI_BLOCK, 0),
                    new BaseBlock(BlockID.QUARTZ_BLOCK, 0),
                    new BaseBlock(BlockID.CLOTH, 0),new BaseBlock(BlockID.CLOTH, 1),new BaseBlock(BlockID.CLOTH, 2),                    //wool
                    new BaseBlock(BlockID.CLOTH, 3),new BaseBlock(BlockID.CLOTH, 4),new BaseBlock(BlockID.CLOTH, 5),
                    new BaseBlock(BlockID.CLOTH, 6),new BaseBlock(BlockID.CLOTH, 7),new BaseBlock(BlockID.CLOTH, 8),
                    new BaseBlock(BlockID.CLOTH, 9),new BaseBlock(BlockID.CLOTH, 10),new BaseBlock(BlockID.CLOTH, 11),
                    new BaseBlock(BlockID.CLOTH, 12),new BaseBlock(BlockID.CLOTH, 13),new BaseBlock(BlockID.CLOTH, 14),
                    new BaseBlock(BlockID.CLOTH, 15),
                    new BaseBlock(BlockID.COAL_ORE, 0),new BaseBlock(BlockID.DIAMOND_ORE, 0),new BaseBlock(BlockID.IRON_ORE, 0),           //ors
                    new BaseBlock(BlockID.REDSTONE_ORE, 0),new BaseBlock(BlockID.EMERALD_ORE, 0),new BaseBlock(BlockID.GOLD_ORE, 0),
                    new BaseBlock(BlockID.LAPIS_LAZULI_ORE, 0),new BaseBlock(BlockID.QUARTZ_ORE, 0),
                    new BaseBlock(BlockID.SANDSTONE, 1),                                                                                //sandstone
                    new BaseBlock(BlockID.LOG, 0),new BaseBlock(BlockID.LOG, 1),new BaseBlock(BlockID.LOG, 2),                          //wooden logs
                    new BaseBlock(BlockID.LOG, 3),
                    new BaseBlock(BlockID.WOOD, 0),new BaseBlock(BlockID.WOOD, 1),new BaseBlock(BlockID.WOOD, 2),                       //wodden blanks
                    new BaseBlock(BlockID.WOOD, 4),new BaseBlock(BlockID.WOOD, 5),
                    new BaseBlock(BlockID.STONE, 0),new BaseBlock(BlockID.STONE, 1),new BaseBlock(BlockID.STONE, 2),                    //cleanstone
                    new BaseBlock(BlockID.STONE, 3),new BaseBlock(BlockID.STONE, 5),new BaseBlock(BlockID.STONE, 6),
                    new BaseBlock(BlockID.COBBLESTONE, 0),                                                                              //cobbelstone
                    new BaseBlock(BlockID.DIRT, 0)                                                                                      //dirt
                    ];
                    
finalBlocklist = [] //list of blocks that DO appear in the game

hight = 14; //the amount of vertical memory fields. SHOULD be modified to fit the memory game
wide = 7; //the amount of horizontal memory fields. SHOULD be modified to fit the memory game

size = hight * wide; //CAN NOT BE BIGGER THAN 2 X usableBlocks.length OR ODD

startVector = new Vector (10,10,0); //coordinates of the block to be set in one corner field (lowest left is practical)


//LOGIC

//shuffle(useableBlocks) //uncomment if you want to see different kinds of blocks every game

//Fills the final Blocklist with pairs of blocks, until it can fill the memoryboard.
for (in1 = 0; in1 < size/2; in1++){ 
    newInsert = useableBlocks[in1];
    finalBlocklist.push(newInsert);
    finalBlocklist.push(newInsert);
};

shuffle(finalBlocklist); //randomizes the blocks

session = context.remember(); //WorldEdit enviroment


// Two loops loop over the entire board
for (in2 = 0; in2 < wide; in2++){
    for (in3 = 0; in3 < hight; in3++){
        
        block = finalBlocklist.pop(); //pops one block out of the list
        
        vec = new Vector(in2 * 2,in3 * 3,0); /*This is the geometrie of the memory game, in relativ (x,y,z) to the starting vector
                                                If the coordinates of the block in the choosen corner lays on  (10,10,10), the next vertical block on (12,10,10)
                                                and the next horizontal block on (10,13,10), than this are the relativ coordinates: (in2 * 2, in3 * 3, in2 * 0).
                                                
                                                If the coordinates of the block in the choosen corner lays on  (10,10,10), the next vertical block on (10,10,7)
                                                and the next horizontal block on (10,15,10), than this are the relativ coordinates: (in2 * 0, in3 * 5, in2 * -3).
                                                
                                                in2 * 0 reduces to 0.
                                                */
        
        targetVector = startVector.add(vec); //the finale coodinates out of the starting vector and the relativ relation.
        session.setBlock(targetVector, block); //finally spawns the block.
        
    };
};


