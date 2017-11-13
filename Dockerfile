FROM golang

ARG app_env
ENV APP_ENV $app_env

COPY . /go/src/github.com/galapagosit/craft
WORKDIR /go/src/github.com/galapagosit/craft

RUN go get ./
RUN go build

CMD if [ ${APP_ENV} = production ]; \
	then \
	craft; \
	else \
	go get github.com/pilu/fresh && \
	fresh; \
	fi

EXPOSE 1323
