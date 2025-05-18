import Pagamento from '../models/Pagamentos.mjs'

class PagamentosController {

    async criarPagamento(req, res) {
        try {
            const { codigoDebito, documentoPagador, metodoPagamento, numeroCartao, valor } = req.body;

            if ((metodoPagamento === "cartao_credito" || metodoPagamento === "cartao_debito") && !numeroCartao) {
                return res.status(400).json({ error: "Número do cartão é obrigatório para cartão." });
            }

            const pagamento = await Pagamento.create({ codigoDebito, documentoPagador, metodoPagamento, numeroCartao, valor });
            res.status(201).json(pagamento);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async atualizarStatusPagamento(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const pagamento = await Pagamento.findByPk(id);

            if (!pagamento) return res.status(404).json({ error: "Pagamento não encontrado." });

            if (pagamento.status === "PROCESSADO_SUCESSO") {
                return res.status(400).json({ error: "Não é possível alterar um pagamento já processado com sucesso." });
            }

            if (pagamento.status === "PROCESSADO_FALHA" && status !== "PENDENTE") {
                return res.status(400).json({ error: "Somente pode voltar para PENDENTE após falha." });
            }

            if (pagamento.status === "PENDENTE" && !["PROCESSADO_SUCESSO", "PROCESSADO_FALHA"].includes(status)) {
                return res.status(400).json({ error: "Status inválido para atualização." });
            }

            pagamento.status = status;
            await pagamento.save();
            res.json(pagamento);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async listarPagamentos(req, res) {
        try {
            const { codigoDebito, documentoPagador, status } = req.query;

            const where = { ativo: true };

            if (codigoDebito) where.codigoDebito = codigoDebito;
            if (documentoPagador) where.documentoPagador = documentoPagador;
            if (status) where.status = status;

            const pagamentos = await Pagamento.findAll({ where });
            res.json(pagamentos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async excluirPagamentos(req, res) {
        try {
            const { id } = req.params;
            const pagamento = await Pagamento.findByPk(id);

            if (!pagamento || !pagamento.ativo)
                return res.status(404).json({ error: "Pagamento não encontrado ou já inativo." });

            if (pagamento.status !== "PENDENTE") {
                return res.status(400).json({ error: "Apenas pagamentos pendentes podem ser inativados." });
            }

            pagamento.ativo = false;
            await pagamento.save();
            res.json({ message: "Pagamento inativado com sucesso." });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new PagamentosController()
