
//Autumn Card 
(function($){
    'use strict';

    var $backFallingLeaves = $('#brownLeaf , #orangeLeaf , #redLeaf'),
                    $textLine1=$('.text-line-1'),
                    $textLine2=$('.text-line-2'),
                    $textGreeting= $('.text-greeting'),
                    $treeLeaves = $('[id^=treeleaf]'),
                    $floorLeaves = $('[id^=floorleaf]'),
                    $bird = $('#Bird'),
                    $birdEyes= $bird.find('#leftEye, #rightEye'),
                    $nest = $('#NestAndLeaves'),
                    $tree = $('#tree_trunk'),
                    $body = $(body);

                             


    function clearStage(){
        var clearTL = gsap.timeline();

        clearTL.set($backFallingLeaves,{autoAlpha:0})
                .set($textLine1,{autoAlpha:0})
                .set($textLine2,{autoAlpha:0})
                .set($textGreeting,{autoAlpha:0})
                .set($treeLeaves,{autoAlpha:0})
                .set($tree,{autoAlpha:0})
                .set($bird,{y:'+=65',autoAlpha:0})
                .set($nest,{autoAlpha:0})
                .set($floorLeaves,{y:'+=275'})
        return clearTL;
    }

    function enterFloorLeaves(){
        var fLeavesTl = gsap.timeline();

        fLeavesTl
                .staggerTo($floorLeaves,1,{y:0,ease:Back.easeOut()},0.02)
                .fromTo($tree,1,{scale:0.2,autoAlpha:0,transformOrigin:'center bottom',ease:Back.easeInOut},
                {scale:1,autoAlpha:1,transformOrigin:'center bottom',ease:Back.easeInOut})
                


        return fLeavesTl;
    }

    function entertreeLesavesAndBird(){
        var treeTl = gsap.timeline();

        treeTl
            .staggerFromTo($treeLeaves,0.5,{scale:0.2,autoAlpha:0},{scale:1,autoAlpha:1},0.02)
            .fromTo($nest,1,{y:0,scale:0.2,autoAlpha:0,transformOrigin:'center center'}
            ,{y:'-=15',scale:1,autoAlpha:1,transformOrigin:'center center'})
            .add('nest-pop-in')
            .to($bird,1,{y:'-=55',autoAlpha:1,ease:Power4.easeInOut},'nest-pop-in')
            .add('bird-peeking')
            .set($birdEyes,{autoAlpha:0})
            .set($birdEyes,{autoAlpha:1},'+=0.2')
            .set($birdEyes,{autoAlpha:0},'+=0.3')
            .set($birdEyes,{autoAlpha:1},'+=0.2')
            .add('bird-eyes')
            .to($bird,0.8,{y:'-=23',ease:Power4.easeInOut})
            .to($bird,0.3,{y:'+=9',ease:Power4.easeOut,onComplete:startBlinking})
        
           function startBlinking(){
               var birdEyesTl = gsap.timeline({repeat:-1,repeatDelay:2})
               birdEyesTl
                .set($birdEyes,{autoAlpha:0})
                .set($birdEyes,{autoAlpha:1},'+=0.2')
                .set($birdEyes,{autoAlpha:0},'+=1.2')
                .set($birdEyes,{autoAlpha:1},'+=0.2')
           } 

        return treeTl;

    }

    function enterGreeting(){
        var greetingTl = gsap.timeline();

       greetingTl
                .fromTo($textLine1,1,{y:'-=50',autoAlpha:1},{y:0,autoAlpha:1})
                .fromTo($textLine2,1,{y:'-=25',autoAlpha:1},{y:0,autoAlpha:1})
                .staggerFromTo($textGreeting,0.5,{scale:2,autoAlpha:0,transformOrigin:'center center'},
                {scale:1,autoAlpha:1,transformOrigin:'center center'},0.1)

        return greetingTl;
    }

    

    function go(){
        var mainTL = gsap.timeline();
        
        mainTL.add(clearStage(),'scene-clear-stage')
               .add(enterFloorLeaves(),'scene-floor-leaves')
               .add(entertreeLesavesAndBird(),'scene-tree-bird')
               .add(enterGreeting(),'scene-greeting')
    }

    go();
})(jQuery);

