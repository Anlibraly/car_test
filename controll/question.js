/**
 * @author Anlibraly
 * @class  测评模板
 * time 2015-12-15

 */
var myTime = null;
var carTime = null;
var car = angular.module("myCar",[]);
// 问题列表
car.controller("carControl", function($scope,$document) {
    $scope.carStyle={'width':'207px'};
    //$scope.cir = {'opacity':'0.5'};
    $scope.imgs = 'img/none.png'
    $scope.distance = 15;
    $scope.carwidth = 207;
    $scope.distance_tmp = 15;
    $scope.opens = 0;
    $scope.times = 3;
    $scope.dis_time = 5;
    $scope.v1 = 20;
    $scope.v2 = 20;
    $scope.a1 = 0;
    $scope.a11 = 0;
    $scope.a2 = 0;
    $scope.round = 0;
    $scope.counts = 0;
    $scope.mode = -1;
    $scope.mode_round = 0;
    $scope.sml_count = 0;
    $scope.sts = "还未开始";
    $scope.ser = "";
    $scope.over = false;
    $scope.starts = 0;
    $scope.dist = new Array();
    $scope.t = new Array();
    $scope.btc = new Array();
    $scope.a1_arr = [[5,2,2,0,0,0],[8,2,2,2,5,5],[2,5,8,2,5,2]];
    $scope.a11_arr = [[5,5,8,0,0,0],[8,8,5,2,8,5],[2,8,8,5,5,8]];
    $scope.mode_name = ['学习模式','甲模式','乙模式'];
    $scope.round_name = ['第一次','第二次','第三次','第四次','第五次','第六次'];

    $document.bind("keypress", function(event) {

        if(event.keyCode == 97){
            if($scope.starts == 1){
                $scope.a2 = 3;
                if($scope.btc[$scope.round]==undefined){
                    $scope.t[$scope.round] = {id:$scope.round,ts:[10*$scope.sml_count+'ms']};
                    $scope.btc[$scope.round] = {id:$scope.round,a:['轻']};
                    $scope.dist[$scope.round] = {id:$scope.round,dt:[$scope.distance.toFixed(2)+'m']};
                }else{
                    $scope.btc[$scope.round].a.push('轻');
                    $scope.t[$scope.round].ts.push(10*$scope.sml_count+'ms');
                    $scope.dist[$scope.round].dt.push($scope.distance.toFixed(2)+'m');
                }
                //$scope.starts = 0;
                $scope.$apply();
                $scope.runcar();
            }            
        }

        if(event.keyCode == 115){
            if($scope.starts == 1){
                $scope.a2 = 6;
                if($scope.btc[$scope.round]==undefined){
                    $scope.btc[$scope.round] = {id:$scope.round,a:['中']};
                    $scope.t[$scope.round] = {id:$scope.round,ts:[10*$scope.sml_count+'ms']};
                    $scope.dist[$scope.round] = {id:$scope.round,dt:[$scope.distance.toFixed(2)+'m']};
                }else{
                    $scope.btc[$scope.round].a.push('中');
                    $scope.t[$scope.round].ts.push(10*$scope.sml_count+'ms');
                    $scope.dist[$scope.round].dt.push($scope.distance.toFixed(2)+'m');
                }
                //$scope.starts = 0;
                $scope.$apply();
                $scope.runcar();
            }            
        }

        if(event.keyCode == 100){
             if($scope.starts == 1){
                $scope.a2 = 9;
                if($scope.btc[$scope.round]==undefined){
                    $scope.btc[$scope.round] = {id:$scope.round,a:['重']};
                    $scope.t[$scope.round] = {id:$scope.round,ts:[10*$scope.sml_count+'ms']};
                    $scope.dist[$scope.round] = {id:$scope.round,dt:[$scope.distance.toFixed(2)+'m']};
                }else{
                    $scope.btc[$scope.round].a.push('重');
                    $scope.t[$scope.round].ts.push(10*$scope.sml_count+'ms');
                    $scope.dist[$scope.round].dt.push($scope.distance.toFixed(2)+'m');

                }
                //$scope.starts = 0;
                $scope.$apply();
                $scope.runcar();
            }           
        }
       
        //console.log(event.keyCode);
    });
    $scope.$watch('distance',function(){
            if($scope.distance <= 0){
                clearInterval(myTime);
                clearInterval(carTime);
                //alert($scope.round+"  "+ $scope.distance)
                if($scope.dist[$scope.round]==undefined){
                    $scope.dist[$scope.round] = {id:$scope.round,dt:[$scope.distance.toFixed(2)+'m']};
                }else{
                    $scope.dist[$scope.round].dt.push($scope.distance.toFixed(2)+'m');
                }
                $scope.round++;
                $scope.imgs = 'img/none.png';
                $scope.sts = "测试结束，等待开始";
                $scope.$apply();
            }else{
                $scope.carStyle={'width':3937/($scope.distance+4)+'px'};
            }
    });
    $scope.count = function(){
        myTime = setInterval(function() {
                                     $scope.starts = 1;
                                     $scope.times -= 0.01;
                                     $scope.times = $scope.times.toFixed(2);
                                     $scope.sml_count ++;
                                     $scope.$apply(); // 通知视图模型的变化
                                     //alert($scope.round+"  "+ $scope.distance)
                                     if ($scope.times<=0) {
                                        clearInterval(myTime);
                                        clearInterval(carTime);    
                                        $scope.dist[$scope.round].dt.push($scope.distance.toFixed(2)+'m');
                                        $scope.round++;
                                        $scope.imgs = 'img/none.png';
                                        $scope.sts = "测试结束，等待开始";
                                        $scope.$apply();
                                     };
                                }, 10);
    };

    $scope.runcar = function(){
            clearInterval(carTime); 
            carTime = setInterval(function() {
                 $scope.distance = $scope.distance + ($scope.a2 - $scope.a1)*0.01/2+($scope.v1-$scope.v2)*0.1
                 //console.log($scope.a2);
                 $scope.v1 = $scope.v1 - $scope.a1*0.1;
                 $scope.v2 = $scope.v2 - $scope.a2*0.1;
                 $scope.counts ++;
                 if ($scope.counts == $scope.dis_time) {
                    $scope.a1 = $scope.a11;
                 }
                 if($scope.opens == 1){
                     if($scope.a1 == 2){
                        //$scope.cir = {'opacity':'0.2'};
                        $scope.imgs = 'img/soft.png';
                     }else if($scope.a1 == 5){
                        //$scope.cir = {'opacity':'0.5'};
                        $scope.imgs = 'img/middle.png';
                     }else if($scope.a1 == 8){
                        //$scope.cir = {'opacity':'0.9'};
                        $scope.imgs = 'img/heavy.png';
                     }else{
                        //$scope.cir = {'opacity':'0.5'};
                        $scope.imgs = 'img/none.png';
                     }
                 }else{
                    $scope.imgs = 'img/middle.png';
                 }
                 $scope.$apply(); // 通知视图模型的变化
            }, 100);        
    };

    $scope.rerun = function(){
            $scope.distance = $scope.distance_tmp;
            $scope.carwidth = 207;
            $scope.times = 3;
            $scope.a2 = 0;
            $scope.starts = 0;
            $scope.v1 = 20;
            $scope.v2 = 20;
            //$scope.cir = {'opacity':'0.5'};
            $scope.counts = 0;
            $scope.sml_count = 0;
            $scope.$apply();
            $scope.count();
            $scope.runcar();        
    };

});



car.directive("study", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            scope.mode = 0;
            scope.mode_round = 0;
            scope.over = false;
            scope.$apply();
        });  
    };
});

car.directive("jiamode", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            scope.mode = 1;
            scope.mode_round = 0;
            scope.over = false;
            scope.$apply();     
        });            
    };
});
car.directive("yimode", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            scope.mode = 2;
            scope.mode_round = 0;
            scope.over = false;
            scope.$apply();            
        });    
    };
});
car.directive("open", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            if(scope.opens == 0){
                scope.opens = 1;
                element.text('原刹车灯');
                scope.$apply();
            }else{
                scope.opens = 0;
                element.text('改进后刹车灯');
                scope.$apply();               
            }
        });  
    };
});

car.directive("gogo", function($http) {
    return function(scope, element, attrs) {
        element.bind("click", function() {
            //alert(scope.mode+'   '+scope.mode_round);
            if(scope.mode == -1){
                alert('请先选择一个模式');
            }else{
                if((scope.mode==0&&scope.mode_round>=3)||(scope.mode<3&&scope.mode_round>=6)){
                    alert('该模式下测试结束');
                }else{
                    //alert(scope.distance);
                    scope.imgs = 'img/none.png';
                    scope.starts = 0;
                    scope.distance = scope.distance_tmp;
                    scope.a1 = scope.a1_arr[scope.mode][scope.mode_round];
                    scope.a11 = scope.a11_arr[scope.mode][scope.mode_round];
                    scope.ser = scope.mode_name[scope.mode]+'-'+scope.round_name[scope.mode_round];
                    scope.sts = "测试开始";
                    scope.$apply();
                    var atm = parseInt(4*Math.random()+2);
                    setTimeout(function(){
                        scope.rerun();
                    },atm*1000);

                    if((scope.mode==0&&scope.mode_round==2)||(scope.mode<3&&scope.mode_round==5)){
                       setTimeout(function(){
                            scope.over = true; 
                            scope.$apply();
                        },(atm+4)*1000);
                    }
                    scope.mode_round++;
                }
            }
        });  
        scope.$watch('mode',function(){
            if(scope.mode > -1){
                element.text('开始'+scope.mode_name[scope.mode]+'-第一次');
            }
        });
         scope.$watch('mode_round',function(){
            if((scope.mode==0&&scope.mode_round>-1&&scope.mode_round<3)||(scope.mode>0&&scope.mode<3&&scope.mode_round>-1&&scope.mode_round<6)){
                element.text('开始'+scope.mode_name[scope.mode]+'-'+scope.round_name[scope.mode_round]);
            }else if(scope.mode>=0&&scope.mode_round>-1){
                element.text(scope.mode_name[scope.mode]+'测试完毕');
            }
        });       
    };
});
