window.onload = () => {

	const fetchTabela = async () => {
		const data = await fetch("http://localhost:8000/infos/tabela")
		const dataJson = await data.json()
		let list = `
		<table>
		<tr>
			<th>Clube</th>
			<th>Vitórias</th>
			<th>Empates</th>
			<th>Derrotas</th>
  	</tr>`
		dataJson.data.map(item => {
			list += `<tr> <td>${item.clube.charAt(0).toUpperCase() + item.clube.slice(1).toLowerCase()}</td><td>${item.Vitorias}</td> <td>${item.Empates}</td> <td>${item.Derrotas}</td> </tr>`
		})
		document.querySelector('#table').innerHTML = list + '</table>'
	}

	document.getElementById('btn-altura').addEventListener("click", async () => {
		const altura = document.getElementById('altura').value
		if (!altura) {
			return
		}
		const data = await fetch("http://localhost:8000/infos/altura", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ altura })
		})
		const dataJson = await data.json()
		let list = `
		<table>
		<tr>
			<th>Nome</th>
			<th>Clube</th>
			<th>Altura</th>
			<th>Gols Sofridos</th>
			<th>Defesas</th>
			<th>Lançamentos</th>
		</tr>`
		if (dataJson.data.length) {
			dataJson.data.map(item => {
				list += `<tr> <td>${item.nome.charAt(0).toUpperCase() + item.nome.slice(1).toLowerCase()}</td><td>${item.clube}</td> <td>${item.altura}</td> <td>${item.gols_sofridos}</td><td>${item.Defesas}</td><td>${item.Lançamentos}</td> </tr>`
			})
			document.querySelector('#goleiros').innerHTML = list + '</table>'
			document.querySelector('#goleiros').style.display = "block"
			document.querySelector('#error-altura').style.opacity = 0
		} else {
			document.querySelector('#error-altura').style.opacity = 1
			document.querySelector('#goleiros').style.display = "none"
		}
	})

	document.getElementById('btn-time').addEventListener("click", async () => {
		const time = document.getElementById('time').value
		if (!time) {
			return
		}
		const data = await fetch("http://localhost:8000/infos/perdedores", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ time })
		})
		const dataJson = await data.json()
		let list = ``
		if (dataJson.data.length) {
			dataJson.data.map(item => {
				list += `<p><span style="font-weight:bold; color:green">${time.charAt(0).toUpperCase() + time.slice(1).toLowerCase()}</span> x ${item.Perdedor.charAt(0).toUpperCase() + item.Perdedor.slice(1).toLowerCase()} </p>`
			})
			console.log(list)
			document.querySelector('#partidas').innerHTML = list
			document.querySelector('#partidas').style.display = "block"
			document.querySelector('#error-time').style.opacity = 0
		} else {
			document.querySelector('#error-time').style.opacity = 1
			document.querySelector('#partidas').style.display = "none"
		}
	})

	document.getElementById('btn-restante').addEventListener("click", async () => {
		const time = document.getElementById('time-restante').value
		if (!time) {
			return
		}
		const data = await fetch("http://localhost:8000/infos/partidas-restantes", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ time })
		})
		const dataJson = await data.json()
		let list = ``
		if (dataJson.data.length) {
			dataJson.data.map(item => {
				list += `<p><span style="font-weight:bold;">${time.charAt(0).toUpperCase() + time.slice(1).toLowerCase()}</span> x ${item.nome.charAt(0).toUpperCase() + item.nome.slice(1).toLowerCase()} </p>`
			})
			console.log(list)
			document.querySelector('#partidas-restantes').innerHTML = list
			document.querySelector('#partidas-restantes').style.display = "block"
			document.querySelector('#error-time-restantes').style.opacity = 0
		} else {
			document.querySelector('#error-time-restantes').style.opacity = 1
			document.querySelector('#partidas-restantes').style.display = "none"
		}
	})

	fetchTabela()
}