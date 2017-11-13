FROM golang

ARG app_env
ENV APP_ENV $app_env

COPY . /go/src/github.com/galapagosit/craft
WORKDIR /go/src/github.com/galapagosit/craft

RUN go get ./
RUN go build
RUN go get github.com/pilu/fresh

CMD if [ ${APP_ENV} = production ]; \
	then \
	craft; \
	else \
	fresh; \
	fi

EXPOSE 1323
