echo ; 

if [ "$1" = "down" ]; then
    echo "starting down command"
    
    docker stop web
    docker rm web

    echo "It's down!"; echo;
    exit 1
fi


if [ "$1" = "run" ]; then
    echo "starting run command"
    echo "starting client web"

    docker run -p 80:80 --name web -dit web 
    
    echo "client web is running..!"; echo;
    exit 1
fi

if [ "$1" = "build" ]; then
    echo "starting run command"
    echo "building client web"

    docker build -t web .
    
    echo "client web is builded..!"; echo;
    exit 1
fi

if [ "$1" = "rebuild" ]; then
    echo "starting run command"
    echo "re-building client web"

    docker stop web
    docker rm web
    docker build --no-cache -t web .
    
    echo "client web is re-builded..!"; echo;
    exit 1
fi

if [ "$1" = "help" ]; then

  echo "----- HELP COMMAND -----"
  echo "1-) sh service.sh run          => just run client web"
  echo "2-) sh service.sh build         => just build client web"
  echo "3-) sh service.sh down         => just down client web"
  echo "4-) sh service.sh rebuild         => just rebuild client web"
  echo "5-) sh service.sh help         => show all the sample commands"

fi

if [ $# -eq 0 ]; then

  echo "there are no any argument parameter.."
  echo "for show all the sample commands; sh service.sh help"
  
fi

echo ; echo ; 